import { View, Text, Image } from 'react-native'
import React from 'react'
import { getLocalStorage } from '../service/storage'
import { useEffect,useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
export default function Header() {

    const [user,setUser]=useState();
    useEffect(()=>{
       getUserDetails(); 
    },[]);
    const getUserDetails=async()=>{
        const userInfo=await getLocalStorage('userDetails');
        console.log(userInfo);
        setUser(userInfo);
    }
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }}>
        <View
        style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            marginLeft:5,
            marginTop:15

        }}
        
        >

            


            <Text style={{
                fontSize:25,
                fontWeight:'bold'
            }}>Welcome {user?.displayName} 🤗</Text>
        </View>

        <View style={{
            marginTop:15,
            marginRight:10
        }}>
        <Feather name="settings" size={24} color="black" />
        </View>
     
    </View>
  )
}