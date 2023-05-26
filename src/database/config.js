import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtrLfjENjwEu6c6EsVVkOYupwMKqPXQMY",
  authDomain: "addiscinemaapp.firebaseapp.com",
  projectId: "addiscinemaapp",
  storageBucket: "addiscinemaapp.appspot.com",
  messagingSenderId: "756936030571",
  appId: "1:756936030571:web:7f97b99ff7d103396f342e",
  measurementId: "G-ZMM1Q37L92",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export default firebaseConfig;
