import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useRouter } from "expo-router";
import AddMedForm from "./AddMedForm";
export default function AddMed() {
  const route=useRouter();
  return (
    <View>
      <Image
        source={require("../../assets/images/consult.png")}
        style={{
          height: 280,
          width: "100%",
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          padding: 25,
        }}
        onPress={()=>router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <AddMedForm/>
    </View>
  );
}
