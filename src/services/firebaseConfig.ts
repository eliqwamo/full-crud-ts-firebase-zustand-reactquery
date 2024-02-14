
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGE_SENDER_ID",
  appId: "APP_ID"
};


const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);