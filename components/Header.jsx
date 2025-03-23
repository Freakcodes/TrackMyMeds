import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, {useEffect, useState } from 'react';
// import React, { useEffect } from 'react';
import { getLocalStorage } from '../service/Storage';
//import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { getLocalStorage } from '../service/Storage';

export default function Header() {
    const router = useRouter();   
    const [user, setUser]=useState('');
    useEffect(()=>{
        GetUserDetail();
    },[]);
    const GetUserDetail=async()=>{
        const userInfo= await getLocalStorage('userDetail');
        // console.log(userInfo);
        setUser(userInfo);
    }

    return (
        <View style={{
            marginTop: 20,
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: "#CED7DE",
                paddingBottom: 5
        

            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,                    
                }}>
                    <Image source={require('./../assets/images/smiley.png')} 
                    style={{
                        width:45,
                        height:45
                }}/>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>Hello {user?.displayName} 👋</Text>                    

                </View>
                {/* Settings Icon : */}
                <TouchableOpacity onPress={() => router.push("/add-new-medication")}>
                <Ionicons name="medkit-outline" size={34} color="#8475BD" />
                </TouchableOpacity>

            </View>

        </View>
    )
}