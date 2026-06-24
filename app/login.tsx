// ログイン画面です。
// メールアドレスとパスワードを受け取り、
// Firebase Auth でサインインします。
import { useState } from "react";

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Firebase の認証機能を使って、メールアドレスとパスワードでのログインを行います。
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  auth
} from "../firebaseConfig";

import {
  router
} from "expo-router";

// ログイン画面です。ユーザーの入力を受け取り、Firebase 認証を実行します。
export default function Login(){

  // 入力フォームの状態を保持します。
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // ユーザがログインボタンを押したときに呼ばれる関数です。
  // Firebase に email / password でサインインを要求します。
  const login = async()=>{

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      router.replace("/(tabs)");


    }catch(error:any){

      Alert.alert(
        "ログイン失敗",
        error.message
      );

    }

  };


  return(

    <View
      style={{
        flex:1,
        justifyContent:"center",
        padding:20
      }}
    >

      <Text
        style={{
          fontSize:30,
          fontWeight:"bold",
          marginBottom:30
        }}
      >
        SSD Campus
      </Text>


      <TextInput
        placeholder="大学メール"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth:1,
          padding:15,
          marginBottom:15,
          borderRadius:10
        }}
      />


      <TextInput
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth:1,
          padding:15,
          marginBottom:20,
          borderRadius:10
        }}
      />


      <TouchableOpacity
        onPress={login}
        style={{
          backgroundColor:"#4A90E2",
          padding:15,
          borderRadius:10
        }}
      >

        <Text
          style={{
            color:"white",
            textAlign:"center"
          }}
        >
          ログイン
        </Text>


      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>{
        router.push("/register")
        }}
      >
          <Text
          style={{
            textAlign:"center",
            marginTop:20
            }}
          >
            アカウントを作成する
            </Text>
            
      </TouchableOpacity>
    </View>

  );

}