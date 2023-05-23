// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzVoGRsXlGdBzBqDT5qu_bZT244tD2VVc",
  authDomain: "quest-services.firebaseapp.com",
  projectId: "quest-services",
  storageBucket: "quest-services.appspot.com",
  messagingSenderId: "110129717048",
  appId: "1:110129717048:web:f82d213e00bb2621ae2bcd",
  measurementId: "G-GCGYGKG8J4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
