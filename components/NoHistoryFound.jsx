import { View, Text, Image } from "react-native";
import React from "react";

export default function NoHistoryFound() {
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/History.jpg")}
        style={{
          height: 300,
          width: 350,
          borderRadius: 20,
        }}
      />

      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 10 }}>
        No Medication history found!!
      </Text>
    </View>
  );
}