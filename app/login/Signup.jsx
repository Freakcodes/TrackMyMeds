import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import {auth} from './../../config/FirebaseConfig';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setLocalStorage } from '../../service/Storage';
           



export default function SignUp() {
    const router = useRouter();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [userName, setUserName]=useState('');

    const OnCreateAccount = () => {
        if (!email || !password || !userName) {
            ToastAndroid.show('Please Fill all the details', ToastAndroid.BOTTOM);
            alert('Please Fill all the details');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // Update the user's profile with the display name
                await updateProfile(user, {
                    displayName: userName
                });
            
                // await setLocalStorage('userDetail', user), {}
                // Save user details to local storage
                await setLocalStorage('userDetail', {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });                
                ToastAndroid.show('Account created successfully!', ToastAndroid.BOTTOM);
                router.push('(tabs)'); // Navigate to the signin screen
               
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                if (errorCode === 'auth/email-already-in-use') {
                    ToastAndroid.show('Email Already in Use', ToastAndroid.BOTTOM);
                } else if (errorCode === 'auth/invalid-email') {
                    ToastAndroid.show('Invalid email address', ToastAndroid.BOTTOM);
                } else if (errorCode === 'auth/weak-password') {
                    ToastAndroid.show('Password should be at least 6 characters', ToastAndroid.BOTTOM);
                } else {
                    ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
                }
               
            });
    };

    return (
        <View style={{
            padding: 35
        }}>
            <Text style={styles.textHeader}>Create New Account</Text>

            <View style={{
                marginTop: 25
             }}>
                <Text>Full Name</Text>
                <TextInput placeholder='Enter Full Name' style={styles.textInput}
                onChangeText={(value) => setUserName(value)}/>

            </View>
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
                secureTextEntry={true}
                onChangeText={(value)=>setPassword(value)}/>

            </View>
            <TouchableOpacity style={styles.button}
                onPress={OnCreateAccount}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCreate}
                onPress={() =>router.push('login/signin')}
            >
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Colors.Primary
                
                }}>Already Have Account? Sing In</Text>
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

