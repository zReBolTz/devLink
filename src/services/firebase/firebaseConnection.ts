import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtfgo8yOlLB-ZZMf_Zh6py1e1-AhKroUE",
  authDomain: "devlink-d8844.firebaseapp.com",
  projectId: "devlink-d8844",
  storageBucket: "devlink-d8844.firebasestorage.app",
  messagingSenderId: "1036118675043",
  appId: "1:1036118675043:web:3bdffe3a412f1393763256",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
