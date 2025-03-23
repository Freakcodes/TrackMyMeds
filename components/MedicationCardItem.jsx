import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TypeList } from "../constant/Options";

export default function MedicationCardItem({ medicine, selectedDate = "" }) {
  const [status, setStatus] = useState();

  // console.log(medicine)

  const checkStatus = () => {
    try {
      const data = medicine?.action?.find((item) => item.date === selectedDate);
      console.log('-->',data);
      
      // console.log("--|--",data);
      // console.log(typeof data, data);
      setStatus(data);
    } catch (error) {}
  };

  useEffect(() => {
    checkStatus();
  }, [medicine]);

  
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* Medicine icon : */}
        {medicine?.type?.icon && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: medicine?.type?.icon }}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </View>
        )}
        {/* Medicine name : */}
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: 14 }}>{medicine?.when}</Text>
          <Text style={{ color: "#3D5466" }}>
            QTY : {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {medicine?.reminder}
        </Text>
      </View>

      {status?.date && (
        <View style={styles.statusContainer}>
          {status?.status == "Taken" ? (
            <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
          ) : (
            status?.status == "Missed" && (
              <Ionicons name="close-circle" size={24} color={"red"} />
            )
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: Colors.LIGHT_PRIMARY,
    backgroundColor: "#C1BADE",
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 15,
  },
  reminderContainer: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  statusContainer: {
    position: "absolute",
    top: 5,
    padding: 7,
  },
});