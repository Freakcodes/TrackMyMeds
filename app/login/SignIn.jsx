import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './../../config/FirebaseConfig';
import { setLocalStorage } from '../../service/Storage';
 

export default function Sign() {
    const router = useRouter();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const OnSignInClick = () => {
        if (!email || !password) {
            Alert.alert('Please enter email and password');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                await setLocalStorage('userDetail', user);
                router.push('(tabs)');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == 'auth/invalid-creditentials') {
                    Alert.alert('Invalid email and password');
                }
            });
                    
    };
    return (
        <View style={{
            padding: 35
        }}>
            <Text style={styles.textHeader}>Let's sign You In</Text>
            <Text style={styles.subText}>Welcome Back</Text>
            <Text style={styles.subText}>You've been missed</Text>
            <View style={{
                marginTop: 25
             }}>
                <Text>Email</Text>
                <TextInput placeholder='Email' style={styles.textInput}
                onChangeText={(value)=>setEmail(value)}/>

            </View>
            <View style={{
                marginTop: 25
             }}>
                <Text>Password</Text>
                <TextInput placeholder='Password' style={styles.textInput}
                secureTextEntry={true} onChangeText={(value)=>setPassword(value)}/>

            </View>
            <TouchableOpacity style={styles.button} onPress={OnSignInClick}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCreate}
                onPress={()=>router.push('login/signUp')}
            >
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Colors.Primary
                
                }}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );  
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold'
        
    },
    subText: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color:Colors.GRAY
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: Colors.Primary,

        padding: 20,
        borderRadius: 15,
        marginTop: 35
    },
    buttonCreate: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.Primary
    }
})