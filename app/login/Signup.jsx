import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
  
} from "react-native";
import React,{useState} from "react";
import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { auth } from "../../config/fireBase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setLocalStorage } from "../service/storage";
export default function Signup() {

  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[username,setUsername]=useState("");
  const[error,setError]=useState();
  const router = useRouter();
  
  const handleSignUp=()=>{

    if(!email || !password){
      Alert.alert("Please enter your email or password");
    }
     createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    await updateProfile(user,{
      displayName:username
    })

     await setLocalStorage('userDetails',user);
    router.push('(tabs)');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode=='auth/email-already-in-use')
    {
      ToastAndroid.show('Email already exists',ToastAndroid.CENTER);
    }
    // ..
  });
  }
  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles?.textHeader}>Create New Account.</Text>
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            marginBottom: 3,
            fontSize: 17,
            marginLeft: 3,
          }}
        >
          Username
        </Text>
        <TextInput placeholder="Enter your full name" style={styles?.input} 
        onChangeText={(text)=>setUsername(text)}
        />
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            marginBottom: 3,
            fontSize: 17,
            marginLeft: 3,
          }}
        >
          Email
        </Text>
        <TextInput placeholder="Enter your email" style={styles?.input} 
        onChangeText={(value)=>setEmail(value)}
        />
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            marginBottom: 3,
            fontSize: 17,
            marginLeft: 3,
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Enter your password"
          style={styles?.input}
          onChangeText={(value)=>setPassword(value)}
        />
      </View>

      <TouchableOpacity style={styles?.button}
      onPress={handleSignUp}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "white",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles?.button}
        
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "white",
            
          }}
        >
          Already Have an account?Login.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  subText: {
    fontSize: 30,
    fontWeight: "semibold",
    marginTop: 10,
    color: Colors.GRAY,
  },
  input: {
    borderColor: "black",
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    fontSize: 17,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 30,
  },
});
