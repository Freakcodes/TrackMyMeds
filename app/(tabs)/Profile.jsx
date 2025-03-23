import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getLocalStorage, removeLocalStorage } from "../../service/Storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";

const Menu = [
  {
    id: 1,
    name: "Add New Medication",
    icon: "add-outline",
    path: "/add-new-medication",
  },
  {
    id: 2,
    name: "My Medication",
    icon: "medkit",
    path: "(tabs)",
  },
  {
    id: 3,
    name: "History",
    icon: "time",
    path: "(tabs)/History",
  },
  {
    id: 4,
    name: "Logout",
    icon: "exit",
    path: "/logout",
  },
];

export default function Profile() {
  const [user, setUser] = useState();

  const router = useRouter();

  const onPressMenu = (item) => {
    if (item.name !== "Logout") {
      router.push(item.path);
    } else {
      Alert.alert("Logout", "Are you sure, you want to Logout?", [
        {
          text: "Cancel",
        },
        {
          text: "Ok",
          onPress: async () => {
            await removeLocalStorage();
            router.push("/login")
          } 
        }
      ])
    }
  }

  const getUserDetails = async () => {
    const userInfo = await getLocalStorage("userDetail");
    // console.log(userInfo);
    setUser(userInfo);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "400" }}>Profile</Text>

      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/smiley.png")}
          style={{
            height: 50,
            width: 50,
          }}
        />

        <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
          {user?.displayName}
        </Text>

        <Text style={{ fontSize: 12, color: "#8F94A3" }}>{user?.email}</Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity key={item.id} style={styles.btnStyle} onPress={() => onPressMenu(item)}>
              <Ionicons
                name={item.icon}
                size={30}
                color="#8083B3"
                style={styles.iconStyle}
              />

              <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    height: "100%",
    padding: 30,
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  iconStyle: {
    padding: 10,
    backgroundColor: "#D9D9E8",
    borderRadius: 10,
  },
  btnStyle: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.SMOKE_WHITE,
    padding: 10,
    borderRadius: 10,
  },
});