import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/fireBase";
// import { setLocalStorage } from "../../service/storage";
import { setLocalStorage } from "../service/storage";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const router = useRouter();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setLocalStorage('userDetails',user)
        router.push('(tabs)');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        
        if(errorCode==='auth/invalid-email')
            {
              console.log("I am inside");
              
              Alert.alert('Invalid Email')
            }
        else if(errorCode==='auth/invalid-credential'){
          Alert.alert('Invalid Credential! Please Check your email or password');
        }
        
      });
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles?.textHeader}>Lets Sign You in</Text>
      <Text style={styles?.subText}>Welcome Back</Text>
      <Text style={styles?.subText}>You've been missed</Text>

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
          Email
        </Text>
        <TextInput placeholder="Enter your email" style={styles?.input} 
        onChangeText={(text)=>setEmail(text)}
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

          onChangeText={(text)=>setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles?.button}
      onPress={handleSignIn}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "white",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles?.button}
        onPress={() => router.push("login/Signup")}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "white",
          }}
        >
          Don't have an account? Create Account
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
