import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function MedicineCartItem({ medicine }) {
  console.log(medicine);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>
        <View>
            <Text style={{
                fontSize:20,
                fontWeight:'bold'
            }}>{medicine?.name}</Text>
            <Text>{medicine?.when}</Text>
            <Text>{medicine?.dose} {medicine?.type.name} </Text>
        </View>
        
      </View>
      <Text style={{
        fontWeight:'700'
      }}>{medicine?.reminder}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:'#ADD8E6',
        marginTop:10,
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

    },  
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  subContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    
  }


});
