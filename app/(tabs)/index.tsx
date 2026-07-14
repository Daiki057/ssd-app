// タブ画面のホームです。
// プロフィールとお気に入りの友達一覧を表示します。
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

const avatars:any = {

  icon1: require("../../assets/icons/icon1.png"),
  icon2: require("../../assets/icons/icon2.png"),
  icon3: require("../../assets/icons/icon3.png"),
  icon4: require("../../assets/icons/icon4.png"),
  icon5: require("../../assets/icons/icon5.png"),
  icon6: require("../../assets/icons/icon6.png"),

};

const facultyInitial:any = {

  "企業情報学部":"Ⓙ",
  "環境ツーリズム学部":"Ⓣ",
  "社会福祉学部":"Ⓕ",
  "地域経営学部":"Ⓒ",
  "共創情報学部":"Ⓚ",

};

const formatBirth = (value:string)=>{

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

const formatList = (value: any) => {

  if (!value)
    return "-";

  if (Array.isArray(value))
    return value.length > 0 ? value.join("、") : "-";

  if (typeof value === "string")
    return value;

  return "-";

};

const firstItem = (value: any) => {

  if (!value)
    return "-";

  if (Array.isArray(value))
    return value[0] ?? "-";

  if (typeof value === "string")
    return value.split(",")[0];

  return "-";

};

export default function Home(){

const [user,setUser] = useState<any>(null);

const [friends,setFriends] = useState<any[]>([]);

useEffect(()=>{

const uid =
auth.currentUser?.uid;

if(!uid)
return;

const unsubUser = onSnapshot(

doc(
db,
"users",
uid
),

(snapshot)=>{

if(snapshot.exists()){

setUser({

uid,

...snapshot.data()

});

}

}

);

return ()=>unsubUser();

},[]);

useEffect(()=>{

if(!user)
return;

const friendIds =
user.friends ?? [];

const unsubList:any[] = [];

friendIds.forEach((friendUid:string)=>{

const unsub = onSnapshot(

doc(
db,
"users",
friendUid
),

(snapshot)=>{

setFriends((prev)=>{

const removed =

prev.filter(

(f)=>f.uid !== friendUid

);

// 削除済みユーザーの場合
// 表示だけ消す

if(!snapshot.exists()){

return removed;

}

return [

...removed,

{

uid:friendUid,

...snapshot.data()

}

];

});

}

);

unsubList.push(unsub);

});

return ()=>{

unsubList.forEach(

(u:()=>void)=>u()

);

};

},[user]);

if(!user){

return(

<View>

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

<View style={styles.profileContainer}>

<View style={styles.leftProfile}>

<TouchableOpacity

onPress={()=>{

router.push("/profile");

}}

>

<Image

source={avatars[user.avatar]}

style={styles.myIcon}

/>

</TouchableOpacity>

<Text style={styles.myName}>

{user.name}

</Text>

</View>

<View style={styles.rightProfile}>

<Text style={styles.info}>

{user.mbti}

</Text>

<Text style={styles.info}>

誕生日：
{formatBirth(user.birthDate)}

</Text>

<Text style={styles.info}>

{user.faculty}

</Text>

<Text style={styles.info}>
サークル：
{formatList(user.circle)}
</Text>

<Text style={styles.info}>
講義：
{firstItem(user.courses)}
</Text>

</View>

</View>

<View style={styles.friendContainer}>

<Text style={styles.title}>

友達一覧 {friends.length}人

</Text>

{

friends.map((friend)=>(

<View

key={friend.uid}

style={styles.friendRow}

>

<Image

source={avatars[friend.avatar]}

style={styles.friendIcon}

/>

<Text style={styles.friendText}>

{friend.name}

{"       "}

{ facultyInitial[friend.faculty] ||""}
 : 
 {firstItem(friend.courses)}
</Text>

</View>

))

}

</View>

</ScrollView>

);

}

const styles = StyleSheet.create({

container:{

flex:1,

backgroundColor:"#ffd6dc"

},

profileContainer:{

flexDirection:"row",

alignItems:"center",

padding:20,

},

leftProfile:{

alignItems:"center",

width:150,

},

myIcon:{

width:110,

height:110,

borderRadius:55,

},

myName:{

fontSize:24,

fontWeight:"bold",

marginTop:10,

},

rightProfile:{

flex:1,

alignItems:"flex-start",

},

info:{

fontSize:17,

marginBottom:10,

},

friendContainer:{

padding:20,

},

title:{

fontSize:22,

fontWeight:"bold",

marginBottom:20,

},

friendRow:{

flexDirection:"row",

alignItems:"center",

marginBottom:20,

},

friendIcon:{

width:60,

height:60,

borderRadius:30,

},

friendText:{

fontSize:17,

marginLeft:20,

flexShrink:1,

},

});