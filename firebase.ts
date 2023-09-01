import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlzNvZAIfiJjo_hf6LQ9zeoFhghkqILJ8",
  authDomain: "todo-school-95c18.firebaseapp.com",
  projectId: "todo-school-95c18",
  storageBucket: "todo-school-95c18.appspot.com",
  messagingSenderId: "1011349710333",
  appId: "1:1011349710333:web:868faf9425ca1eba60a594",
};

// Initialize Firebase
const app = getApps().length! ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
