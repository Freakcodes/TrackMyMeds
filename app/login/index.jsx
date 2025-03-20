import { View, Text,Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { useRouter } from 'expo-router'
export default function LoginScreen() {

    const router=useRouter();
  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:30
      }}>
        <Image source={require('../../assets/images/login.png')}
        style={{
            width:210,
            height:450,
            borderRadius:23
        }}
        />
      </View>
      <View
      style={{
        padding:30,
        backgroundColor:Colors.PRIMARY,
        marginTop:10,
        height:'100%'

      }}
      >
        <Text style={{
            fontWeight:'bold',
            fontSize:30,
            color:'white',
            textAlign:'center'
            
        }}>Stay on Track,Stay Healthy!</Text>

        <Text style={{
            color:'white',
            textAlign:'center',
            marginTop:'20',
            fontSize:17,
            
        }}>
            Track your meds, Take control of your health!
        </Text>

        <TouchableOpacity style={styles?.button}
        onPress={()=>router.push('login/SignIn')}
        >
            <Text style={
                {
                    textAlign:'center',
                    fontSize:16,
                    color:Colors.PRIMARY
                }
            }>
                Continue
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    button:{
        padding:15,
        backgroundColor:'white',
        borderRadius:99,
        marginTop:20
    }
})