// Firebase の初期化コードです。
// このファイルはアプリ全体で Firebase の接続や認証・Firestore・Storage を使えるようにします。
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// React Native で動く AsyncStorage を使い、Firebase Auth のログイン状態を保持します。
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase プロジェクトへ接続するための設定値です。
// ここに書かれている情報は、Firebase コンソールで作成したプロジェクト固有の値です。
const firebaseConfig = {
  apiKey: "AIzaSyAjFqd_234vpz3hLZnP1Q9SSMaLeGWcx_o",
  authDomain: "ssd-project01-90c2e.firebaseapp.com",
  projectId: "ssd-project01-90c2e",
  storageBucket: "ssd-project01-90c2e.firebasestorage.app",
  messagingSenderId: "614155334500",
  appId: "1:614155334500:web:011fcef2c037f4a1e28071",
  measurementId: "G-PWLM7TQLXY"
};

// Firebase を初期化し、Firestore と Storage、Auth を他のファイルから使えるようにします。
// このファイルを import するだけで、他の画面から `db`, `storage`, `auth` が利用できます。
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(
  app,
  {
    persistence:
      getReactNativePersistence(
        AsyncStorage
      )
  }
)

// `auth` は Firebase の認証状態を管理します。
// `getReactNativePersistence(AsyncStorage)` によって、アプリを再起動してもログイン状態が維持されます。
