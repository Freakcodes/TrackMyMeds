import { View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
// import React, {useEffect, useState } from 'react';
import Colors from '../constant/Colors';
import ConstantString from '../constant/ConstantString';
import { useRouter } from 'expo-router'
import React from "react";

export default function EmptyState() {
    const router=useRouter();

    return (
        <View style={{
            marginTop : 80,
            display: 'flex',
            alignItems: 'center'
        }}>

            <Image source={require('./../assets/images/medicine.png')}
            style={{
                width:120,
                height:120
            }}
            />

            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginTop:30
            }}>{ConstantString.NoMedications}
            </Text>

            <Text style={{
                fontSize: 16,
                color: Colors.DARK_GRAY,
                textAlign: 'center',
                marginTop: 20

            }}>{ConstantString.MedicationSubText}
            \</Text>
            
            <TouchableOpacity style={{
                backgroundColor: Colors.Primary,
                padding: 15,
                borderRadius: 10,
                width: '100%',
                marginTop: 30
            }}
            onPress={() => router.push('/add-new-medication')}
            >
                <Text style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: 'white'
                }}>{ConstantString.AddNewMedications}</Text>
            </TouchableOpacity>
        </View>
    );
}