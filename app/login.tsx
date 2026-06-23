import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';


export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const register = async () => {

    if (!email || !password) {
      Alert.alert(
        '入力不足',
        'メールとパスワードを入力してください'
      );
      return;
    }


    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );


      Alert.alert(
        '登録成功',
        userCredential.user.email ?? 'メール取得失敗'
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