// edit.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

import {
  useState
} from "react";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebaseConfig";

import {
  router
} from "expo-router";


export default function EditProfile(){

  const [name,setName]
  = useState("");

  const [faculty,setFaculty]
  = useState("");

  const save = async()=>{


    const uid =
    auth.currentUser?.uid;


    if(!uid)
    return;



    await setDoc(
      doc(
        db,
        "users",
        uid
      ),
      {

        name:name,

        faculty:faculty,

        mbti:"",

        friends:[]

      }

    );


    router.replace("/(tabs)");

  };



  return(

    <View
      style={styles.container}
    >

      <TextInput

        placeholder="名前"

        value={name}

        onChangeText={setName}

        style={styles.input}

      />


      <TextInput

        placeholder="学部"

        value={faculty}

        onChangeText={setFaculty}

        style={styles.input}

      />


      <Button

        title="保存"

        onPress={save}

      />


    </View>

  );

}



const styles=StyleSheet.create({

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