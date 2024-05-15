// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC5ZRBNb1djWS4H4hrUOdP0k6HPWCA0Zg",
  authDomain: "fmds-crud-d2e11.firebaseapp.com",
  databaseURL: "https://fmds-crud-d2e11-default-rtdb.firebaseio.com",
  projectId: "fmds-crud-d2e11",
  storageBucket: "fmds-crud-d2e11.appspot.com",
  messagingSenderId: "686037928091",
  appId: "1:686037928091:web:e2c4ebeca0d220a0395e3e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export default db;
