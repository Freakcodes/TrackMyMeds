import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/fireBase'
import { getLocalStorage, RemoveLocalStorage } from '../service/storage'
import Header from '../components/Header'
import EmptyState from '../components/EmptyState'
import MedicationList from '../components/MedicationList'

export default function HomeScreen() {
  const handleLogout=()=>{
    RemoveLocalStorage();
    console.log('I am here')
    const temp=getLocalStorage('userDetails');
    console.log(temp);
    
  }
  return (
    <View>
      <Header/>
      {/* <EmptyState/> */}
      <MedicationList/>
    </View>

    
  )
}