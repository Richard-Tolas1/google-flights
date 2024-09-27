// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7wO7jzJejavh-rUQa3AGpYw_u9O9d6YU",
  authDomain: "flights-9f9f8.firebaseapp.com",
  projectId: "flights-9f9f8",
  storageBucket: "flights-9f9f8.appspot.com",
  messagingSenderId: "1010541452942",
  appId: "1:1010541452942:web:7bb4a4b189c3b6396373df",
  measurementId: "G-L1MXJ41TVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);