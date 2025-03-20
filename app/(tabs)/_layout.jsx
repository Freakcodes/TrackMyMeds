import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/fireBase';
import { getLocalStorage } from '../service/storage';

export default function TabLayout() {

    const router=useRouter();
    const[authenticated,setAuthenticated]=useState(null);
    useEffect(()=>{
        getUserDetails();
        
        
    },[]);
    const getUserDetails=async()=>{
        const userInfo=await getLocalStorage('userDetails');
        console.log(userInfo);
        
        if(!userInfo){
            router.replace('/login');
        }
    }
  return (
    <Tabs screenOptions={{
        headerShown:false
    }}>
        <Tabs.Screen name='index'
        options={
            {
                tabBarLabel:'Home',
                tabBarIcon:({color,size})=>(
                    <Entypo name="home" size={24} color="black" /> 
                )
            }
        }
        />
        <Tabs.Screen name='AddNew'
        options={
            {
                tabBarLabel:'Add',
                tabBarIcon:({color,size})=>(
                    <AntDesign name="plussquare" size={24} color="black" />
                )
            }
        }
        />
        <Tabs.Screen name='Profile'
        options={
            {
                tabBarLabel:'Profile',
                tabBarIcon:({color,size})=>(
                    <AntDesign name="user" size={24} color="black" />
                )
            }
        }
        />
    </Tabs>
  )
}