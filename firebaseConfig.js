// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjFqd_234vpz3hLZnP1Q9SSMaLeGWcx_o",
  authDomain: "ssd-project01-90c2e.firebaseapp.com",
  projectId: "ssd-project01-90c2e",
  storageBucket: "ssd-project01-90c2e.firebasestorage.app",
  messagingSenderId: "614155334500",
  appId: "1:614155334500:web:011fcef2c037f4a1e28071",
  measurementId: "G-PWLM7TQLXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);