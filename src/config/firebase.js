// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr-DtfOkv70jc58qnPsViB3cemPv0rZFA",
  authDomain: "niraj-todo.firebaseapp.com",
  projectId: "niraj-todo",
  storageBucket: "niraj-todo.appspot.com",
  messagingSenderId: "1074472027967",
  appId: "1:1074472027967:web:d680f793a26b3d58a4358a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
