// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBycR7Uvj-jOTCQY2k944pYFvsnvPtXsaw",
  authDomain: "expo-project-e9725.firebaseapp.com",
  projectId: "expo-project-e9725",
  storageBucket: "expo-project-e9725.firebasestorage.app",
  messagingSenderId: "1066097953797",
  appId: "1:1066097953797:web:9b49b177288270f90d206c",
  measurementId: "G-STKXMVVGZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);