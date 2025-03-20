// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlnMWxwrrE80pw1Pm9raCn05JxDTb493Y",
  authDomain: "reactnative-61427.firebaseapp.com",
  projectId: "reactnative-61427",
  storageBucket: "reactnative-61427.firebasestorage.app",
  messagingSenderId: "727947199464",
  appId: "1:727947199464:web:9e5f1b6f382926eabc5a5d",
  measurementId: "G-0SC4SKSWPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
const analytics = getAnalytics(app);

export const db=getFirestore(app);