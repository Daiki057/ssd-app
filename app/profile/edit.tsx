// edit.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します。
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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


export default function EditProfile(){


  const [name,setName] = useState("");
  const [studentId,setStudentId] = useState("");
  const [faculty,setFaculty] = useState("選択してください");
  const [year,setYear] = useState("選択してください");
  const [age,setAge] = useState("");
  const [birthDate,setBirthDate] = useState("");
  const [mbti,setMbti] = useState("選択してください");
  const [circle,setCircle] = useState("");
  const [courses,setCourses] = useState("");


  const [showFaculty,setShowFaculty] = useState(false);
  const [showYear,setShowYear] = useState(false);
  const [showMbti,setShowMbti] = useState(false);



  const save = async()=>{


    const uid = auth.currentUser?.uid;


    if(!uid)
      return;



    if(
      faculty === "選択してください" ||
      year === "選択してください" ||
      mbti === "選択してください"
    ){

      alert("学部・学年・MBTIを選択してください");
      return;

    }



    if(!name.trim()){

      alert("名前を入力してください");
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
        ? parseInt(age)
        : null,

        birthDate,

        mbti,

        circle,

        courses,

        friends:[]

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
        名前 *
      </Text>


      <TextInput

        placeholder="名前を入力"

        value={name}

        onChangeText={setName}

        style={styles.input}

      />



      <Text style={styles.label}>
        学籍番号
      </Text>


      <TextInput

        placeholder="例:J20000"

        value={studentId}

        onChangeText={setStudentId}

        style={styles.input}

      />



      <Text style={styles.label}>
        学部 *
      </Text>


      <TouchableOpacity

        style={styles.selectBox}

        onPress={()=>{
          setShowFaculty(true)
        }}

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

        onPress={()=>{
          setShowYear(true)
        }}

      >

        <Text>
          {year}
        </Text>

      </TouchableOpacity>




      <Text style={styles.label}>
        年齢
      </Text>


      <TextInput

        placeholder="年齢"

        value={age}

        onChangeText={setAge}

        keyboardType="number-pad"

        style={styles.input}

      />




      <Text style={styles.label}>
        誕生日
      </Text>


      <TextInput

        placeholder="YYYY/MM/DD"

        value={birthDate}

        onChangeText={setBirthDate}

        style={styles.input}

      />




      <Text style={styles.label}>
        MBTI *
      </Text>


      <TouchableOpacity

        style={styles.selectBox}

        onPress={()=>{
          setShowMbti(true)
        }}

      >

        <Text>
          {mbti}
        </Text>

      </TouchableOpacity>




      <Text style={styles.label}>
        所属サークル
      </Text>


      <TextInput

        placeholder="サークル名"

        value={circle}

        onChangeText={setCircle}

        style={styles.input}

      />




      <Text style={styles.label}>
        登録講義
      </Text>


      <TextInput

        placeholder="講義を入力"

        value={courses}

        onChangeText={setCourses}

        multiline

        style={styles.input}

      />




      <Button

        title="保存"

        onPress={save}

      />





      {/* 学部Modal */}

      <SelectModal

        visible={showFaculty}

        data={faculties}

        close={()=>setShowFaculty(false)}

        select={(v)=>{

          setFaculty(v);

          setShowFaculty(false);

        }}

      />



      {/* 学年Modal */}

      <SelectModal

        visible={showYear}

        data={years}

        close={()=>setShowYear(false)}

        select={(v)=>{

          setYear(v);

          setShowYear(false);

        }}

      />



      {/* MBTI Modal */}

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



type SelectModalProps = {
  visible:boolean;
  data:string[];
  close:()=>void;
  select:(v:string)=>void;
};

function SelectModal(
  {
    visible,
    data,
    close,
    select
  }:SelectModalProps
){


return(


<Modal

visible={visible}

transparent

animationType="slide"

>


<View style={styles.modalBackground}>


<View style={styles.modal}>


{

data.map(
(item:string)=>(


<TouchableOpacity

key={item}

style={styles.option}

onPress={()=>select(item)}

>


<Text>

{item}

</Text>


</TouchableOpacity>


)

)

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





const styles = StyleSheet.create({


container:{

flexGrow:1,

padding:20

},



input:{

borderWidth:1,

padding:15,

marginBottom:15,

borderRadius:8

},



label:{

fontSize:16,

fontWeight:"bold",

marginBottom:8,

marginTop:12

},



selectBox:{

borderWidth:1,

padding:15,

borderRadius:8,

marginBottom:15

},



modalBackground:{

flex:1,

justifyContent:"center",

padding:20,

backgroundColor:"rgba(0,0,0,0.3)"

},



modal:{

backgroundColor:"white",

borderRadius:15,

padding:20

},



option:{

padding:18,

borderBottomWidth:1

}


});