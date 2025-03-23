import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';

export default function LoginScreen() { 
    const router = useRouter();
    return (
        <View>
            <View style={{
            display: 'flex',
 
            alignItems: 'center',
            marginTop: 100
            }}>
                <Image source={require('./../../assets/images/login.png')} 
                    style={styles.image}
                />
            </View>
            <View style={{
                padding: 20,
                backgroundColor: Colors.Primary,
                height: '100%'
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center'
                }}>Stay on Track, Stay Healthy!</Text>

                <Text style={{
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 20
                }}>Track Your Meds, take control of your health. Stay consitent, Stay Confident!</Text>

                <TouchableOpacity style={styles.button}
                    onPress={()=>router.push('login/signin')}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: Colors.Primary

                    }}>Get Started</Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 6
                }}>Note: By Clicking Get Started button, You Will agree to our terms and condition</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 450,
        borderRadius: 15
    },
    button:{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 99,
        marginTop: 25
    }
});