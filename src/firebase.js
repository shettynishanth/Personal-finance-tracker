// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAttD_s1oP_0TcGR2g5_NBrEun1cjnMJ40",
  authDomain: "personal-finance-tracker-df2c2.firebaseapp.com",
  projectId: "personal-finance-tracker-df2c2",
  storageBucket: "personal-finance-tracker-df2c2.appspot.com",
  messagingSenderId: "200669350797",
  appId: "1:200669350797:web:45b0d960fcf4a6ad614bc4",
  measurementId: "G-CWQQ0BEYLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth,app,signInWithPopup, signOut  };
export const googleProvider = new GoogleAuthProvider();
