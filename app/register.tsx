// 新規登録画面です。
// メールアドレスとパスワードを受け取り、
// Firebase Auth で新しいユーザーを作成します。
import {
  useState
} from "react";

import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from "react-native";


import {
  createUserWithEmailAndPassword
} from "firebase/auth";


import {
  auth,
  db
} from "../firebaseConfig";


import {
  doc,
  setDoc
} from "firebase/firestore";


import {
  router
} from "expo-router";



export default function Register(){


  const [email,setEmail]
  = useState("");


  const [password,setPassword]
  = useState("");



  const register = async()=>{


    try{


      const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      const uid =
      userCredential.user.uid;



      // Firestore users作成

      await setDoc(

        doc(
          db,
          "users",
          uid
        ),

        {

          name:"",

          studentId:"",

          faculty:"",

          mbti:"",

          friends:[]

        }

      );



      Alert.alert(
        "登録成功"
      );


      router.replace(
        "/profile/edit"
      );



    }catch(error:any){


      Alert.alert(
        "登録失敗",
        error.message
      );


    }

  };



return(

<View
style={styles.container}
>


<TextInput

placeholder="大学メール"

value={email}

onChangeText={setEmail}

autoCapitalize="none"

style={styles.input}

/>



<TextInput

placeholder="パスワード"

value={password}

onChangeText={setPassword}

secureTextEntry

style={styles.input}

/>



<Button

title="新規登録"

onPress={register}

/>


</View>

);


}



const styles = StyleSheet.create({

container:{
 flex:1,
 justifyContent:"center",
 padding:20
},


input:{
 borderWidth:1,
 padding:15,
 marginBottom:15
}

});