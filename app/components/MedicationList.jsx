import { View, Text, Image,FlatList,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { getDateRangeToDisplay } from '../service/ConverDateTime';
import Colors from '../constants/Colors';
import moment from 'moment';
import { getLocalStorage } from '../service/storage';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../config/fireBase';
import { getDocs } from 'firebase/firestore';
import MedicineCartItem from './MedicineCartItem';
export default function MedicationList() {
    const [medList,setMedList]=useState();
    const [dateRange,setDateRange]=useState();
    const [selectedDate,setSelectedDate]=useState(moment().format('MM/DD/YYYY'))
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
        getRangeToDisplay();
        GetMedicationList(selectedDate);
    },[]);

    const GetMedicationList=async(selectedDate)=>{
        setLoading(true);
        const user=await getLocalStorage('userDetails');
        setMedList([]);
        try{
            const q=query(collection(db,'medicines'),where('userEmail','==',user?.email),
            where('dates','array-contains',selectedDate))

            const querySnapshot=await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                console.log('docId:'+doc.id+'==>',doc.data())
                setMedList(prev=>[...prev,doc.data()]) 
            }
            
            )
           
        setLoading(false);
        }catch(error)
        {
            console.log(error);
            
        }
    }
    const getRangeToDisplay=()=>{
        setDateRange(getDateRangeToDisplay());
        console.log(dateRange);
    }
  return (
    <View style={{
        marginTop:25,
        marginLeft:20,
        width:'90%'
    }}>
      <Image source={require('../../assets/images/medication.jpeg')}
        style={{
            width:'100%',
            height:200,
            borderRadius:15
        }}
      />

      <FlatList
      
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            
            <TouchableOpacity style={[styles?.dateGroup,{backgroundColor:item.formattedDate==selectedDate?Colors.PRIMARY:Colors.GRAY}]}
            onPress={()=>(setSelectedDate(item.formattedDate),
                          GetMedicationList(item.formattedDate)
                    )}
            >
                <Text style={[styles.day,{color:item.formattedDate==selectedDate?'white':'black'}]}>{item.day}</Text>
                <Text style={[styles.day,{color:item.formattedDate==selectedDate?'white':'black'}]}>{item.date}</Text>
            </TouchableOpacity>
        )}
      />
      <FlatList
        data={medList}
        onRefresh={()=>GetMedicationList(selectedDate)}
        refreshing={loading}
        renderItem={({item,index})=>(
            <MedicineCartItem medicine={item}/>
        )}
      />
      
    </View>
  )
}

const styles=StyleSheet.create({
    dateGroup:{
        padding:10,
        backgroundColor:Colors.GRAY,
        display:"flex",
        alignItems:'center',
        marginTop:10,
        marginRight:10,
        borderRadius:15
    },
    day:{
        fontSize:26,
        fontWeight:'bold',
    }
})