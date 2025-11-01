// Firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ add this line

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzzATe8VS6csEecnEhFNCNRbMFSzTAUf8",
  authDomain: "lets-in-c3234.firebaseapp.com",
  projectId: "lets-in-c3234",
  storageBucket: "lets-in-c3234.appspot.com",
  messagingSenderId: "345110286293",
  appId: "1:345110286293:web:09205a68c711f98343f75c",
  databaseURL: "https://lets-in-c3234-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Export Realtime Database instance
export const db = getDatabase(app);
