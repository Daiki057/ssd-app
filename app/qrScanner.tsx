// qrScanner.tsx
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";


import {
  CameraView,
  useCameraPermissions
} from "expo-camera";


import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";


import {
  auth,
  db
} from "../firebaseConfig";


import {
  useState
} from "react";



export default function QRScanner(){


  const [
    permission,
    requestPermission
  ] = useCameraPermissions();



  const [scanned,setScanned]
  = useState(false);





  const addFriend = async(data:string)=>{


    if(scanned)
      return;


    setScanned(true);



    const myUid =
    auth.currentUser?.uid;



    if(!myUid){


      Alert.alert(
        "エラー",
        "ログイン情報がありません"
      );


      return;

    }



    if(myUid === data){


      Alert.alert(
        "エラー",
        "自分自身は追加できません"
      );


      setScanned(false);

      return;

    }




    try{


      const userRef =
      doc(
        db,
        "users",
        myUid
      );



      const snapshot =
      await getDoc(userRef);



      const friends =
      snapshot.exists()
      ? snapshot.data().friends ?? []
      : [];




      if(friends.includes(data)){


        Alert.alert(
          "確認",
          "すでに友達です"
        );


        return;

      }





      await updateDoc(
        doc(db,"users",myUid),
        {
          friends:arrayUnion(data)
        }
      );
      
      await updateDoc(
        doc(db,"users",data),
        {
          friends:arrayUnion(myUid)
        }
      );

      Alert.alert(

        "成功",

        "友達追加しました"

      );



    }catch(error){


      console.log(error);


      Alert.alert(

        "エラー",

        "友達追加に失敗しました"

      );


    }


  };






  if(!permission){


    return <View />;


  }





  if(!permission.granted){


    return(

      <View style={styles.container}>


        <Text>

          カメラ権限が必要です

        </Text>



        <Button

          title="許可する"

          onPress={requestPermission}

        />


      </View>


    );


  }





  return(


    <View style={styles.container}>


      <CameraView


        style={styles.camera}


        facing="back"



        onBarcodeScanned={

          ({data})=>{

            addFriend(data);

          }

        }



        barcodeScannerSettings={{

          barcodeTypes:[

            "qr"

          ]

        }}


      />




      <Text style={styles.text}>


        QRを読み取ってください


      </Text>



    </View>


  );

}





const styles = StyleSheet.create({


container:{


flex:1,

justifyContent:"center",

alignItems:"center"


},



camera:{


width:"100%",

height:"80%"


},



text:{


fontSize:20,

marginTop:20


}


});