// Firebase アプリ本体と、アプリ内で使う Firestore / Storage を読み込みます。
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Firebase プロジェクトへ接続するための設定値です。
// 他の画面は、この設定から作った db / storage を経由してデータを扱います。
const firebaseConfig = {
  apiKey: "AIzaSyAjFqd_234vpz3hLZnP1Q9SSMaLeGWcx_o",
  authDomain: "ssd-project01-90c2e.firebaseapp.com",
  projectId: "ssd-project01-90c2e",
  storageBucket: "ssd-project01-90c2e.firebasestorage.app",
  messagingSenderId: "614155334500",
  appId: "1:614155334500:web:011fcef2c037f4a1e28071",
  measurementId: "G-PWLM7TQLXY"
};

// Firebase を初期化し、Firestore と Storage を他ファイルから使えるようにします。
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
