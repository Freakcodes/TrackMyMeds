import { View, Text, Button, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "../../components/Header";
import EmptyState from "../../components/EmptyState";
import MedicationList from "../../components/MedicationList";
import Colors from "../../constant/Colors";

export default function HomeScreen() {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 10,
            height: "100%",
            width: "100%",
            // backgroundColor: "#B0D7FF",
            // backgroundColor: Colors.YELLOW,
            // backgroundColor: "#fff",
            // position: "relative", 
          }}
        >
          {/* <Text>HomeScreen!!!!</Text> */}
          {/* <Button title='Logout' onPress={() => signOut(auth)} /> */}
          {/* <Button title="Logout" onPress={async () => await removeLocalStorage()} /> */}

          <Header />
          <MedicationList />
        </View>
      }
    />
  );
}