import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constant/Colors";
import { getPrevDateRangeToDisplay } from "../../service/ConvertDateTime";
import moment from "moment";
import { getLocalStorage } from "../../service/Storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import EmptyState from "../../components/EmptyState";
import { db } from "../../config/FirebaseConfig";
import MedicationCardItem from "../../components/MedicationCardItem";
import NoHistoryFound from "../../components/NoHistoryFound";

export default function History() {
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [medList, setMedList] = useState();
  const [loading, setLoading] = useState(false);

  const getPreviousSevenDays = () => {
    const dateRange = getPrevDateRangeToDisplay();
    setDateRange(dateRange);
  };

  const getMedicationList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage("userDetails");
    setMedList([]);
    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );

      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        // console.log("docId : " + doc.id + " ==>", doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPreviousSevenDays();
    getMedicationList(selectedDate);
  }, []);

  return (
    <FlatList
      style={{
        height: "100%",
        backgroundColor: "white"
      }}
      data={[]}
      ListHeaderComponent={
        <View style={styles.mainContainer}>
          <Image
            source={require("../../assets/images/med-history.png")}
            style={styles.imageBanner}
          />

          <Text style={styles.headerText}>Medication History</Text>

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
                      color:
                        item.formattedDate == selectedDate ? "white" : "black",
                    },
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        item.formattedDate == selectedDate ? "white" : "black",
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
                <TouchableOpacity>
                  <MedicationCardItem
                    medicine={item}
                    selectedDate={selectedDate}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <NoHistoryFound />
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: "white",
  },
  imageBanner: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
    // height: 90
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
});