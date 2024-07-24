import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1ZE5kPyTzY0f_pGImfhnhUpXkT5B3HYg",
  authDomain: "react-native-task-manage-db87c.firebaseapp.com",
  projectId: "react-native-task-manage-db87c",
  storageBucket: "react-native-task-manage-db87c.appspot.com",
  messagingSenderId: "898130941067",
  appId: "1:898130941067:web:5d21ee27826bb2a1efb08e",
  measurementId: "G-LZT64FHRST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

export default app;
