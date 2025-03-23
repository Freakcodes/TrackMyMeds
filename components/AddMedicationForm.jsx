import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import Colors from "../constant/Colors";
  import { TypeList, WhenToTake } from "../constant/Options";
  import { Picker } from "@react-native-picker/picker";
  import RNDateTimePicker from "@react-native-community/datetimepicker";
  import {
    FormatDate,
    formatDateForText,
    formatTime,
    getDatesRange,
  } from "../service/ConvertDateTime";
  import { getLocalStorage } from "../service/Storage";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "../config/FirebaseConfig";
  import { useRouter } from "expo-router";
  
  export default function AddMedicationForm() {
    const [formData, setFormData] = useState();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();
  
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
  
      // console.log(formData);
    };
  
    const saveMedication = async () => {
      const docId = Date.now().toString();
      const user = await getLocalStorage("userDetail");
      if (
        !(
          formData?.name ||
          formData?.type ||
          formData?.dose ||
          formData?.when ||
          formData?.startDate ||
          formData?.endDate ||
          formData?.reminder
        )
      ) {
        Alert.alert("Please enter all the details.");
        return;
      }
  
      const dates = getDatesRange(formData?.startDate, formData?.endDate);
      setLoading(true);
      console.log(dates);
      
  
      try {
         await setDoc(doc(db, "medication", docId), {
          ...formData,
          userEmail: user.email,
          docId: docId,
          dates: dates,
        });
  
        setLoading(false);
        Alert.alert("Great!", "New Medication added successfully!!", [
          {
            text: "Ok",
            onPress: () => router.push("(tabs)"),
          },
        ]);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
  
    return (
      <View style={{ padding: 25 }}>
        {/* Main heading : */}
        <Text style={styles.header}>Add New Medication</Text>
  
        {/* Medicine name input : */}
        <View style={styles.inputGroup}>
          <Ionicons
            name="medkit-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
  
          <TextInput
            placeholder="Medicine Name"
            style={styles.textInput}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>
  
        {/* Type List :  */}
        <FlatList
          data={TypeList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.typeList,
                { marginRight: 10 },
                {
                  backgroundColor:
                    item?.name === formData?.type?.name ? "#9B9BBF" : "white",
                },
              ]}
              key={index}
              onPress={() => handleInputChange("type", item)}
            >
              <Text
                style={[
                  styles.typeText,
                  {
                    color:
                      item?.name === formData?.type?.name ? "white" : "black",
                  },
                ]}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={
            {
              // marginTop: 5,
            }
          }
        />
  
        {/* Dose list : */}
        <View style={styles.inputGroup}>
          <Ionicons
            name="eyedrop-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
  
          <TextInput
            placeholder="Dose qty Ex : 2 tab, 5ml syrup..."
            style={styles.textInput}
            onChangeText={(value) => handleInputChange("dose", value)}
          />
        </View>
  
        {/* Timing options :  */}
        <View style={[styles.inputGroup, { padding: 0 }]}>
          <Ionicons
            name="time-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
  
          <Picker
            selectedValue={formData?.when}
            onValueChange={(itemValue, itemIndex) =>
              handleInputChange("when", itemValue)
            }
            style={{
              width: "85%",
            }}
          >
            {WhenToTake.map((item, index) => (
              <Picker.Item label={item} key={index} value={item} />
            ))}
          </Picker>
        </View>
  
        {/* Start and End date : */}
        <View style={styles.dateInputGroup}>
          <TouchableOpacity
            style={[styles.inputGroup, { paddingVertical: 10, flex: 1 }]}
            onPress={() => setShowStartDate(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
  
            <Text style={styles.dateText}>
              {formatDateForText(formData?.startDate) ?? "Start Date"}
            </Text>
  
            {showStartDate && (
              <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                  handleInputChange(
                    "startDate",
                    FormatDate(event.nativeEvent.timestamp)
                  );
                  setShowStartDate(false);
                }}
                value={new Date(formData?.startDate) ?? new Date()}
              />
            )}
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.inputGroup, { paddingVertical: 10, flex: 1 }]}
            onPress={() => setShowEndDate(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
  
            <Text style={styles.dateText}>
              {formatDateForText(formData?.endDate) ?? "End Date"}
            </Text>
  
            {showEndDate && (
              <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                  handleInputChange(
                    "endDate",
                    FormatDate(event.nativeEvent.timestamp)
                  );
                  setShowEndDate(false);
                }}
                value={new Date(formData?.endDate) ?? new Date()}
              />
            )}
          </TouchableOpacity>
        </View>
  
        {/* Set remainder option : */}
        <View style={styles.dateInputGroup}>
          <TouchableOpacity
            style={[styles.inputGroup, { paddingVertical: 10, flex: 1 }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons
              name="timer-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
  
            <Text style={styles.dateText}>
              {formData?.reminder ?? "Select Remainder Time"}
            </Text>
  
            {showTimePicker && (
              <RNDateTimePicker
                mode="time"
                is24Hour={false}
                onChange={(event) => {
                  handleInputChange(
                    "reminder",
                    formatTime(event.nativeEvent.timestamp)
                  );
                  setShowTimePicker(false);
                }}
                // default value
                value={new Date(formData?.reminder) ?? new Date()}
              />
            )}
          </TouchableOpacity>
        </View>
  
        {/* Add medication button : */}
        <TouchableOpacity style={styles.button} onPress={saveMedication}>
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={styles.buttonText}>Add New Medication</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      fontWeight: "bold",
      fontSize: 25,
    },
    inputGroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.LIGHT_GRAY_BORDER,
      marginTop: 10,
      backgroundColor: "white",
    },
    typeList: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      // borderColor: "#BCCCE0",
      marginTop: 10,
      backgroundColor: "white",
    },
    textInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
    },
    icon: {
      color: "#7777A6",
      borderRightWidth: 1,
      paddingRight: 12,
      borderColor: "#BCCCE0",
      marginLeft: 6,
    },
    typeText: {
      fontSize: 16,
    },
    dateText: {
      fontSize: 16,
      padding: 5,
      marginLeft: 6,
    },
    dateInputGroup: {
      flexDirection: "row",
      gap: 10,
    },
    button: {
      padding: 15,
      backgroundColor: Colors.Primary,
      borderRadius: 15,
      width: "100%",
      marginTop: 10,
    },
    buttonText: {
      fontSize: 17,
      color: "white",
      textAlign: "center",
    },
  });