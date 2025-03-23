import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MedicationCardItem from "../../components/MedicationCardItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import { db } from "../../config/FirebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import moment from "moment";

export default function MedicationActionModal() {
  const medicine = useLocalSearchParams();

  const router = useRouter();

  const updateActionStatus = async (status) => {
    try {
      const docRef = doc(db, "medication", medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format("LT"),
          date: medicine?.selectedDate,
        }),
      });
      Alert.alert(status, "Response saved!!", [{
        text: "Ok",
        onPress: () => router.replace('(tabs)')
      }])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/notification.gif")}
        style={{
          width: 120,
          height: 120,
        }}
      />

      <Text style={{ fontSize: 18 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#1A8BDB" }}>
        {medicine?.reminder}
      </Text>
      <Text style={{ fontSize: 15 }}>It's time to take</Text>

      <MedicationCardItem medicine={medicine} />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => updateActionStatus("Missed")}>
          <Ionicons name="close-outline" size={24} color="red" />
          <Text
            style={{
              fontSize: 20,
              color: "red",
            }}
          >
            Missed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.successBtn} onPress={() => updateActionStatus("Taken")}>
          <Ionicons name="checkmark-outline" size={24} color="white" />
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            Taken
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ position: "absolute", bottom: 20 }}
        onPress={() => router.back()}
      >
        <Ionicons name="close-circle" size={44} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },
  closeBtn: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
  },
  successBtn: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#5CD676",
    borderRadius: 10,
  },
});