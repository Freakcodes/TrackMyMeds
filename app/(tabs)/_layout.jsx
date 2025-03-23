import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import Colors from "../../constant/Colors";

// Tab Icons :
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getLocalStorage } from "../../service/Storage";

export default function TabLayout() {
  const router = useRouter();

  const getUser = async () => {
    const userInfo = await getLocalStorage("userDetails");

    // if (userInfo===null) {
    //   router.replace("/login");
    // }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.PRIMARY,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          // position: "absolute" // Changes made by me
        },
        tabBarActiveTintColor: "#C1BADE"
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}