// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Corrected import

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBas78WR90-LLi3g-r3dSYQUXju6UmPoIk",
  authDomain: "techchauhan-4f9f4.firebaseapp.com",
  projectId: "techchauhan-4f9f4",
  storageBucket: "techchauhan-4f9f4.appspot.com",
  messagingSenderId: "901954426762",
  appId: "1:901954426762:web:91977fad8f76eabc039a73",
  measurementId: "G-RJ9780XVCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if running in a browser environment)
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firestore and Storage
const db: Firestore = getFirestore(app);
const storage = getStorage(app); // Use getStorage to initialize Storage

export { app, analytics, db, storage };
