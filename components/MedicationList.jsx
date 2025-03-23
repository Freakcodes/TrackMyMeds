import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateRangeToDisplay } from "../service/ConvertDateTime";
import Colors from "../constant/Colors";
import moment from "moment";
import { getLocalStorage } from "../service/Storage";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import MedicationCardItem from "./MedicationCardItem";
import EmptyState from "./EmptyState";
import { useRouter } from "expo-router";

export default function MedicationList() {
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [medList, setMedList] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getNextSevenDays = () => {
    const dateRange = getDateRangeToDisplay();
    setDateRange(dateRange);
  };

  const getMedicationList = async (selectedDate) => {
    setLoading(true);
    
    
    const user = await getLocalStorage("userDetail");
    
    
    setMedList([]);
    try {
      const q = query(
        collection(db, "medication"),
       where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );
      
      
      const querySnapShot = await getDocs(q);
      console.log(querySnapShot);
      
      querySnapShot.forEach((doc) => {
        // console.log("docId : " + doc.id + " ==>", doc.data());
        setMedList((prev) => [...prev, doc.data()]);
        
      });
      console.log("fetched meds",medList)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNextSevenDays();
    getMedicationList(selectedDate);
  }, []);

  return (
    <View
      style={{
        marginTop: 25,
      }}
    >
      <Image
        source={require("../assets/images/medication.jpeg")}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />

      {/* Renders the next 7 dates from the current date */}
      <FlatList
        data={dateRange}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(item.formattedDate);
              getMedicationList(item.formattedDate);
            }}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formattedDate == selectedDate
                    ? "#8475BD"
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
          >
            <Text
              style={[
                styles.day,
                {
                  color: item.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color: item.formattedDate == selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 15 }}
      />

      {medList?.length > 0 ? (
        <FlatList
          data={medList}
          onRefresh={() => getMedicationList(selectedDate)}
          refreshing={loading ? true : false}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: '/action-modal',
              params: {
                ...item,
                selectedDate: selectedDate
              }
            })}>
              <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
});