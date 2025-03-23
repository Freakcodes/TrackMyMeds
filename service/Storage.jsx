
import AsyncStorage from '@react-native-async-storage/async-storage';
export const setLocalStorage = async(Key, value) => {
    await AsyncStorage.setItem(Key,JSON.stringify(value));
}

export const getLocalStorage = async(Key) => {
    const result = await AsyncStorage.getItem(Key);
    return JSON.parse(result);
    
}

 export const removeLocalStorage = async (Key) => {
    await AsyncStorage.removeItem(Key);
 }


 