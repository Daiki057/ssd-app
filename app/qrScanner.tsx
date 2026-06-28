// qrScanner.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
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
  doc,
  getDoc,
  updateDoc,
  arrayUnion
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
]=useCameraPermissions();



const [scanned,setScanned]=useState(false);










const addFriend = async(targetUid:string)=>{



const myUid =
auth.currentUser?.uid;



if(!myUid)
return;



if(myUid===targetUid){


Alert.alert(
"エラー",
"自分自身は追加できません"
);


return;


}







try{



const targetRef =
doc(
db,
"users",
targetUid
);



const myRef =
doc(
db,
"users",
myUid
);






const targetSnap =
await getDoc(targetRef);



if(!targetSnap.exists()){


Alert.alert(
"エラー",
"存在しないユーザーです"
);


return;


}








await updateDoc(

myRef,

{

friends:
arrayUnion(targetUid)

}

);







await updateDoc(

targetRef,

{

friends:
arrayUnion(myUid)

}

);







Alert.alert(
"成功",
"友達追加しました"
);





}catch(e){


console.log(e);


Alert.alert(
"エラー",
"友達追加に失敗しました"
);



}



};









const onScan = ({data}:{data:string})=>{


if(scanned)
return;


setScanned(true);



try{


const qr = JSON.parse(data);



if(qr.type !== "friend"){


Alert.alert(
"エラー",
"友達追加用QRではありません"
);


return;


}



if(!qr.uid){


Alert.alert(
"エラー",
"ユーザー情報がありません"
);


return;


}




addFriend(qr.uid);



}catch{


Alert.alert(
"エラー",
"対応していないQRコードです"
);


}



};










if(!permission){


return<View/>;


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

onBarcodeScanned={onScan}

barcodeScannerSettings={{

barcodeTypes:[

"qr"

]

}}


/>






<Text style={styles.text}>

QRを読み取ってください

</Text>






{scanned && (


<Button

title="もう一度読み取る"

onPress={()=>setScanned(false)}

/>


)}



</View>



);


}









const styles=StyleSheet.create({



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