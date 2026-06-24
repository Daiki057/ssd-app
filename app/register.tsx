// 新規登録画面です。
// メールアドレスとパスワードを受け取り、
// Firebase Auth で新しいユーザーを作成します。
import { router } from 'expo-router';
import { useState } from 'react';

import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Firebase の認証機能を使って、新しいユーザーを登録します。
import {
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

// 新規登録画面です。メールとパスワードを入力してアカウントを作成します。
export default function LoginScreen() {

  // 登録用のフォームの状態を保持します。
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 新規登録処理です。Firebase Auth で新しいユーザーを作成します。
  const register = async () => {

    // メールとパスワードが入力されていない場合は登録を止め、アラートを表示します。
    if (!email || !password) {
      Alert.alert(
        '入力不足',
        'メールとパスワードを入力してください'
      );
      return;
    }


    try {

      // Firebase にユーザーを登録し、登録成功後はホーム画面へ移動します。
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      Alert.alert(
        '登録成功',
        userCredential.user.email ?? 'メール取得失敗',
        [
          {
            text: "OK",
            onPress: () => {
        router.replace("/(tabs)");
            }
          }
        ]
      );


    } catch(error:any){

      Alert.alert(
        '登録失敗',
        error.message
      );

    }

  };


  return (

    <View
      style={{
        flex:1,
        justifyContent:'center',
        padding:20,
      }}
    >


      <Text
        style={{
          fontSize:30,
          fontWeight:'bold',
          marginBottom:30,
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
          borderRadius:10,
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
          borderRadius:10,
        }}
      />



      <TouchableOpacity
        onPress={register}
        style={{
          backgroundColor:'#4A90E2',
          padding:15,
          borderRadius:10,
        }}
      >

        <Text
          style={{
            color:'white',
            textAlign:'center',
            fontWeight:'bold',
          }}
        >
          新規登録
        </Text>

      </TouchableOpacity>


    </View>

  );

}