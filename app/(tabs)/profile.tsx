// プロフィール画面です。
// ユーザー情報を表示・編集するための場所として用意しています。
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


import {
  useEffect,
  useState
} from "react";


import {
  doc,
  onSnapshot
} from "firebase/firestore";


import {
  auth,
  db
} from "../../firebaseConfig";


import {
  router
} from "expo-router";





const avatars:any={


icon1:require("../../assets/icons/icon1.png"),

icon2:require("../../assets/icons/icon2.png"),

icon3:require("../../assets/icons/icon3.png"),

icon4:require("../../assets/icons/icon4.png"),

icon5:require("../../assets/icons/icon5.png"),

icon6:require("../../assets/icons/icon6.png")


};







const formatBirth=(value:string)=>{


if(!value)
return "-";



if(value.includes("年"))
return value;



if(value.length===8){


return (

value.slice(0,4)

+

"年"

+

Number(value.slice(4,6))

+

"月"

+

Number(value.slice(6,8))

+

"日"

);


}



return value;


};









export default function Profile(){



const [profile,setProfile]=useState<any>(null);







useEffect(()=>{


const uid =
auth.currentUser?.uid;



if(!uid)
return;




const unsub = onSnapshot(

doc(
db,
"users",
uid
),


(snapshot)=>{


if(snapshot.exists()){


setProfile(snapshot.data());


}


}


);



return()=>unsub();



},[]);










if(!profile){


return(

<View style={styles.loading}>

<Text>
読み込み中...
</Text>

</View>

);


}









return(


<ScrollView

style={styles.container}

>






<View style={styles.iconArea}>


<Image

source={
avatars[profile.avatar]
}

style={styles.icon}

/>


</View>








<Text style={styles.name}>

{profile.name}

</Text>








<View style={styles.infoBox}>




<Text style={styles.text}>

学籍番号：
{profile.studentId || "-"}

</Text>




<Text style={styles.text}>

学部：
{profile.faculty || "-"}

</Text>





<Text style={styles.text}>

学年：
{profile.year || "-"}

</Text>





<Text style={styles.text}>

年齢：
{
profile.age
?
profile.age+"歳"
:
"-"
}

</Text>





<Text style={styles.text}>

誕生日：
{formatBirth(profile.birthDate)}

</Text>





<Text style={styles.text}>

MBTI：
{profile.mbti || "-"}

</Text>





<Text style={styles.text}>

所属サークル：
{profile.circle || "-"}

</Text>





<Text style={styles.text}>

登録講義：
{profile.courses || "-"}

</Text>





</View>









<TouchableOpacity

style={styles.button}

onPress={()=>{


router.push("/profile/edit");


}}

>


<Text style={styles.buttonText}>

プロフィール編集

</Text>


</TouchableOpacity>









<TouchableOpacity

style={styles.button}

onPress={()=>{


router.push("/qr");


}}

>


<Text style={styles.buttonText}>

友達追加QR

</Text>


</TouchableOpacity>








</ScrollView>


);



}









const styles=StyleSheet.create({



container:{

flex:1,

backgroundColor:"#ffd6dc",

padding:30

},



loading:{

flex:1,

justifyContent:"center",

alignItems:"center"

},



iconArea:{

alignItems:"center",

marginTop:20

},



icon:{

width:120,

height:120,

borderRadius:60

},



name:{

fontSize:30,

fontWeight:"bold",

textAlign:"center",

marginVertical:25

},



infoBox:{

backgroundColor:"#fff",

padding:20,

borderRadius:15

},



text:{

fontSize:18,

marginBottom:15

},



button:{

marginTop:25,

padding:15,

backgroundColor:"#ff8fa3",

borderRadius:10,

alignItems:"center"

},



buttonText:{

color:"#fff",

fontSize:18,

fontWeight:"bold"

}



});