// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD-0CgKIzMFiczBK6Z2SgwR1sKVszWtSXQ",
  authDomain: "hakathon-project-9a490.firebaseapp.com",
  projectId: "hakathon-project-9a490",
  storageBucket: "hakathon-project-9a490.firebasestorage.app",
  messagingSenderId: "510264156057",
  appId: "1:510264156057:web:ae5132a96a9167454e7d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);


// Initialize Firestore
export const db = getFirestore(app);
