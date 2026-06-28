// edit.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebaseConfig";

import {
  router
} from "expo-router";



const faculties = [
  "選択してください",
  "環境ツーリズム学部",
  "企業情報学部",
  "社会福祉学部",
  "共創情報学部",
  "地域経営学部"
];

const years = [
  "選択してください",
  "1年",
  "2年",
  "3年",
  "4年"
];

const mbtis = [
  "選択してください",
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ISTP",
  "ISFP",
  "ESTJ",
  "ESFJ",
  "ESTP",
  "ESFP"
];

const avatars = [

{
id:"icon1",
image:require("../../assets/icons/icon1.png")
},

{
id:"icon2",
image:require("../../assets/icons/icon2.png")
},

{
id:"icon3",
image:require("../../assets/icons/icon3.png")
},

{
id:"icon4",
image:require("../../assets/icons/icon4.png")
},

{
id:"icon5",
image:require("../../assets/icons/icon5.png")
},

{
id:"icon6",
image:require("../../assets/icons/icon6.png")
}
];

export default function EditProfile(){

const [name,setName]=useState("");

const [studentId,setStudentId]=useState("");

const [faculty,setFaculty]=useState(
"選択してください"
);

const [year,setYear]=useState(
"選択してください"
);

const [age,setAge]=useState("");

const [birthDate,setBirthDate]=useState("");

const [mbti,setMbti]=useState(
"選択してください"
);

const [circle,setCircle]=useState("");

const [courses,setCourses]=useState("");

const [avatar,setAvatar]=useState(
"icon1"
);

const [showFaculty,setShowFaculty]=useState(false);

const [showYear,setShowYear]=useState(false);

const [showMbti,setShowMbti]=useState(false);


useEffect(()=>{
loadProfile();
},[]);

const loadProfile = async()=>{

const uid =
auth.currentUser?.uid;

if(!uid)
return;

const snap =
await getDoc(
doc(
db,
"users",
uid
)
);

if(snap.exists()){

  const data=snap.data();

setName(
data.name ?? ""
);

setStudentId(
data.studentId ?? ""
);

setFaculty(
data.faculty ??
"選択してください"
);

setYear(
data.year ??
"選択してください"
);

setAge(
data.age
?
String(data.age)
:
""
);

setBirthDate(
data.birthDate ??
""
);

setMbti(
data.mbti ??
"選択してください"
);

setCircle(
data.circle ??
""
);

setCourses(
data.courses ??
""
);
setAvatar(
data.avatar ??
"icon1"
);
}
};


const formatBirthDate=(value:string)=>{

if(value.length !== 8)
return value;

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
};

const save = async()=>{

const uid =
auth.currentUser?.uid;

if(!uid)
return;

if(
faculty==="選択してください"
||
year==="選択してください"
||
mbti==="選択してください"
){

alert(
"学部・学年・MBTIを選択してください"
);

return;
}

await setDoc(
doc(
db,
"users",
uid
),

{
name,
studentId,
faculty,
year,
age:
age
?
parseInt(age)
:
null,
birthDate:
formatBirthDate(birthDate),
mbti,
circle,
courses,
avatar
},

{
merge:true
}
);

console.log(
"Firestore保存成功"
);

router.replace("/(tabs)");
};

return(

<ScrollView
contentContainerStyle={styles.container}
>

<Text style={styles.label}>
アイコン
</Text>

<View style={styles.iconArea}>

{
avatars.map((item)=>(

<TouchableOpacity
key={item.id}
onPress={()=>{
setAvatar(item.id)
}}
>

<Image
source={item.image}
style={
avatar===item.id
?
styles.selectedIcon
:
styles.icon
}
/>

</TouchableOpacity>

))
}

</View>

<Text style={styles.label}>
名前 *
</Text>

<TextInput
value={name}
onChangeText={setName}
style={styles.input}
/>

<Text style={styles.label}>
学籍番号
</Text>

<TextInput
value={studentId}
onChangeText={setStudentId}
style={styles.input}
/>

<Text style={styles.label}>
学部 *
</Text>

<TouchableOpacity
style={styles.selectBox}
onPress={()=>setShowFaculty(true)}
>

<Text>
{faculty}
</Text>

</TouchableOpacity>

<Text style={styles.label}>
学年 *
</Text>

<TouchableOpacity
style={styles.selectBox}
onPress={()=>setShowYear(true)}
>

<Text>
{year}
</Text>

</TouchableOpacity>

<Text style={styles.label}>
年齢
</Text>

<TextInput
value={age}
onChangeText={setAge}
keyboardType="number-pad"
style={styles.input}
/>

<Text style={styles.label}>
誕生日
</Text>

<TextInput
placeholder="例:20070223"
value={birthDate}
onChangeText={setBirthDate}
style={styles.input}
/>

<Text style={styles.label}>
MBTI *
</Text>

<TouchableOpacity
style={styles.selectBox}
onPress={()=>setShowMbti(true)}
>

<Text>
{mbti}
</Text>

</TouchableOpacity>

<Text style={styles.label}>
所属サークル
</Text>

<TextInput
value={circle}
onChangeText={setCircle}
style={styles.input}
/>

<Text style={styles.label}>
登録講義
</Text>

<TextInput
value={courses}
onChangeText={setCourses}
multiline
style={styles.input}
/>

<Button
title="保存"
onPress={save}
/>

<SelectModal
visible={showFaculty}
data={faculties}
close={()=>setShowFaculty(false)}
select={(v)=>{
setFaculty(v);
setShowFaculty(false);
}}
/>

<SelectModal
visible={showYear}
data={years}
close={()=>setShowYear(false)}
select={(v)=>{
setYear(v);
setShowYear(false);
}}
/>

<SelectModal
visible={showMbti}
data={mbtis}
close={()=>setShowMbti(false)}
select={(v)=>{
setMbti(v);
setShowMbti(false);
}}
/>

</ScrollView>

);
}

type SelectModalProps={
visible:boolean;
data:string[];
close:()=>void;
select:(v:string)=>void;
};

function SelectModal({
visible,
data,
close,
select
}:SelectModalProps){

return(

<Modal
visible={visible}
transparent
animationType="slide"
>

<View style={styles.modalBackground}>

<View style={styles.modal}>

{
data.map((item)=>(

<TouchableOpacity
key={item}
style={styles.option}
onPress={()=>select(item)}
>  

<Text>
{item}
</Text>

</TouchableOpacity>

))
}

<Button
title="閉じる"
onPress={close}
/>

</View>

</View>

</Modal>

);
}


const styles=StyleSheet.create({

container:{
padding:20
},

label:{
fontSize:16,
fontWeight:"bold",
marginTop:15,
marginBottom:8
},

input:{
borderWidth:1,
padding:15,
borderRadius:8,
marginBottom:10
},

selectBox:{
borderWidth:1,
padding:15,
borderRadius:8,
marginBottom:10
},

iconArea:{
flexDirection:"row",
flexWrap:"wrap",
marginBottom:15
},

icon:{
width:60,
height:60,
borderRadius:30,
marginRight:15,
marginBottom:15
},

selectedIcon:{
width:60,
height:60,
borderRadius:30,
marginRight:15,
marginBottom:15,
borderWidth:3
},

modalBackground:{
flex:1,
justifyContent:"center",
backgroundColor:"rgba(0,0,0,0.3)",
padding:20
},

modal:{
backgroundColor:"white",
padding:20,
borderRadius:15
},

option:{
padding:18,
borderBottomWidth:1
}

});