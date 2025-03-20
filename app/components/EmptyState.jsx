import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import { useRouter } from 'expo-router'

export default function EmptyState() {
  const router=useRouter();
  return (
    <View
    style={{
        marginTop:80,
        display:'flex',
        alignItems:'center',
        width:'100%',
        
        
    }}
    >
      <Image source={require('../../assets/images/medicine.png')}
      style={{
        width:130,
        height:130
      }}
      />

     
        <Text
        style={{
            fontSize:35,
            fontWeight:'bold',
            marginTop:30
        }}
        >
            No medications!
        </Text>

        <Text 
        style={{
            fontSize:15,
            fontWeight:'semibold',
            color:Colors.DARKGRAY,
            marginTop:10
        }}
        >
            You have 0 medication setup, Kindly setup a new one
        </Text>

        <TouchableOpacity
        style={{
          backgroundColor:Colors.PRIMARY,
          padding:15,
          borderRadius:10,
          width:'90%',
          marginTop:30
        }}

        onPress={()=>(router.push('/AddNew'))}
        >
          <Text
          style={
            {
              textAlign:'center',
              fontSize:17,
              color:'white'
            }
          }
          >
            + Add new Medicine
          </Text>
        </TouchableOpacity>
      
    </View>
  )
}