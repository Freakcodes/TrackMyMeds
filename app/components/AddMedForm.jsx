import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native";
import Colors from "../constants/Colors";
import { TypeList, WhenToTake } from "../constants/Options";
import { Picker } from "@react-native-picker/picker";
import { FormatDate, formatDateForText, formatTime, getDatesRange } from "../service/ConverDateTime";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { db } from "../../config/fireBase";
import { getLocalStorage } from "../service/storage";
import { router, useRouter } from "expo-router";

export default function AddMedForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker,setShowTimePicker]=useState(false);
  const[loading,setLoading]=useState(false);
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const route=useRouter();
  
  const saveMedication=async()=>{
    const user= await getLocalStorage('userDetails');
    const docId=Date.now().toString();
    if(!(formData?.name||formData?.type||formData?.dose||formData?.startDate||formData?.endDate||formData?.reminder)){
      Alert.alert('all fields are required');
      return;
    }
    const dateRange=getDatesRange(formData?.startDate,formData?.endDate);
    setLoading(true);
    try{
      const data=await setDoc(doc(db,'medicines',docId),{
        ...formData,
        userEmail:user?.email,
        docId:docId,
        dates:dateRange
      })
      setLoading(false);
      console.log('data saved',data);
      Alert.alert('Great',"New Medicines added! Stay Healthy",[
        {
          'text':'OK',
           onPress:()=>route('(tabs)')
        }
      ]);
    }catch(error){
        console.log(error);
        
    }
  }
  
  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.header}>Add New Medicine </Text>

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dose Input */}

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          placeholder="Dose Ex 2.5ml"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* When to take the medicine */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          selectedValue={FormData?.when}
          onValueChange={(itemValue, itemIndex) => {
            onHandleInputChange("when", itemValue);
          }}
          style={{
            width: "90%",
          }}
        >
          {WhenToTake?.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
      <View style={styles.dateInputGroup}>
        <View>
          <TouchableOpacity
            style={[styles.inputGroup]}
            onPress={() => setShowStartDate(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color="black"
              style={styles.icon}
            />

            <Text style={styles.dateText}>
              {formatDateForText(formData?.startDate) ?? "Start Date"}
            </Text>
            </TouchableOpacity>
            {showStartDate && (
              <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                  onHandleInputChange(
                    "startDate",
                    FormatDate(event.nativeEvent.timestamp)
                  );
                  setShowStartDate(false);
                }}
                value={new Date(formData?.startDate) ?? new Date()}
              />
            )}
         
        </View>
        <View>
          <TouchableOpacity
            style={[styles.inputGroup]}
            onPress={() => setShowEndDate(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color="black"
              style={styles.icon}
            />

            <Text style={styles.dateText}>
              {formatDateForText(formData?.endDate) ?? "End Date"}
            </Text>

            {showEndDate && (
              <RNDateTimePicker
                minimumDate={new Date()}
                onChange={(event) => {
                  onHandleInputChange(
                    "endDate",
                    FormatDate(event.nativeEvent.timestamp)
                  );
                  setShowEndDate(false);
                }}
                value={new Date(formData?.endDate) ?? new Date()}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
      <TouchableOpacity
            style={[styles.inputGroup]}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons
              name="timer-outline"
              size={24}
              color="black"
              style={styles.icon}
            />

            <Text style={styles.dateText}>
              {formData?.reminder??'Select Reminder '}

            </Text>
      </TouchableOpacity>
      </View>
      {
        showTimePicker && <RNDateTimePicker
        mode="time"
        onChange={(event)=>{
          setShowTimePicker(false)
          onHandleInputChange('reminder',formatTime(event.nativeEvent.timestamp))
        }}

        value={formData?.reminder??new Date()}
      />
      }
      <TouchableOpacity style={styles?.button} onPress={saveMedication}>
        { loading?<ActivityIndicator size={'large'} color={'white'}/>:
        <Text style={styles?.buttonText}>Add New Medication</Text>}
      </TouchableOpacity>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    backgroundColor: "white",
    marginTop: 9,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  dateInputGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    width:'100%',
    marginTop:20,
    borderRadius:10,

  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontSize:15,
                
  }
});
