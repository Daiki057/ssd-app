// edit.tsx のコード説明: このファイルは React コンポーネントを定義し、アプリの表示と操作を担当します.
import { router } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebaseConfig";

type SelectModalProps = {
  visible: boolean;
  data: string[];
  close: () => void;
  select: (value: string) => void;
};

const faculties = [
  "選択してください",
  "環境ツーリズム学部",
  "企業情報学部",
  "社会福祉学部",
  "共創情報学部",
  "地域経営学部",
];

const years = ["選択してください", "1年", "2年", "3年", "4年"];

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
  "ESFP",
];

const circles = [
  "選択してください",
  "サークルA",
  "サークルB",
  "サークルC",
];

const courseOptions = [
  "選択してください",
  "講義A",
  "講義B",
  "講義C",
];

const avatars = [
  { id: "icon1", image: require("../../assets/icons/icon1.png") },
  { id: "icon2", image: require("../../assets/icons/icon2.png") },
  { id: "icon3", image: require("../../assets/icons/icon3.png") },
  { id: "icon4", image: require("../../assets/icons/icon4.png") },
  { id: "icon5", image: require("../../assets/icons/icon5.png") },
  { id: "icon6", image: require("../../assets/icons/icon6.png") },
];

export default function EditProfile() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [faculty, setFaculty] = useState("選択してください");
  const [year, setYear] = useState("選択してください");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mbti, setMbti] = useState("選択してください");
  const [circle, setCircle] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [avatar, setAvatar] = useState("icon1");
  const [showFaculty, setShowFaculty] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showMbti, setShowMbti] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return;

    const data = snap.data();
    setName(data.name ?? "");
    setStudentId(data.studentId ?? "");
    setFaculty(data.faculty ?? "選択してください");
    setYear(data.year ?? "選択してください");
    setAge(data.age ? String(data.age) : "");
    setBirthDate(data.birthDate ?? "");
    setMbti(data.mbti ?? "選択してください");
    const loadedCircle = data.circle ?? [];
    setCircle(
      Array.isArray(loadedCircle)
        ? loadedCircle
        : loadedCircle
        ? [loadedCircle]
        : []
    );
    const loadedCourses = data.courses ?? [];
    setCourses(
      Array.isArray(loadedCourses)
        ? loadedCourses
        : loadedCourses
        ? [loadedCourses]
        : []
    );
    setAvatar(data.avatar ?? "icon1");
  };

  const formatBirthDate = (value: string) => {
    if (value.length !== 8) return value;
    return `${value.slice(0, 4)}年${Number(value.slice(4, 6))}月${Number(
      value.slice(6, 8)
    )}日`;
  };

  const save = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    if (
      faculty === "選択してください" ||
      year === "選択してください" ||
      mbti === "選択してください"
    ) {
      alert("学部・学年・MBTIを選択してください");
      return;
    }

    await setDoc(
      doc(db, "users", uid),
      {
        name,
        studentId,
        faculty,
        year,
        age: age ? parseInt(age, 10) : null,
        birthDate: formatBirthDate(birthDate),
        mbti,
        circle,
        courses,
        avatar,
      },
      { merge: true }
    );

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            nestedScrollEnabled
          >
            <Text style={styles.label}>アイコン</Text>
            <View style={styles.iconArea}>
              {avatars.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setAvatar(item.id)}
                >
                  <Image
                    source={item.image}
                    style={
                      avatar === item.id ? styles.selectedIcon : styles.icon
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>名前 *</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />

            <Text style={styles.label}>学籍番号</Text>
            <TextInput
              value={studentId}
              onChangeText={setStudentId}
              style={styles.input}
            />

            <Text style={styles.label}>学部 *</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowFaculty(true)}
            >
              <Text>{faculty}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>学年 *</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowYear(true)}
            >
              <Text>{year}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>年齢</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              style={styles.input}
            />

            <Text style={styles.label}>誕生日</Text>
            <TextInput
              placeholder="例:20070223"
              value={birthDate}
              onChangeText={setBirthDate}
              style={styles.input}
            />

            <Text style={styles.label}>MBTI *</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowMbti(true)}
            >
              <Text>{mbti}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>所属サークル</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowCircle(true)}
            >
              <Text>
                {circle.length > 0 ? circle.join(" / ") : "選択してください"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>登録講義</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowCourses(true)}
            >
              <Text>
                {courses.length > 0 ? courses.join(" / ") : "選択してください"}
              </Text>
            </TouchableOpacity>

            <Button title="保存" onPress={save} />

            <SelectModal
              visible={showFaculty}
              data={faculties}
              close={() => setShowFaculty(false)}
              select={(value) => {
                setFaculty(value);
                setShowFaculty(false);
              }}
            />
            <SelectModal
              visible={showYear}
              data={years}
              close={() => setShowYear(false)}
              select={(value) => {
                setYear(value);
                setShowYear(false);
              }}
            />
            <SelectModal
              visible={showMbti}
              data={mbtis}
              close={() => setShowMbti(false)}
              select={(value) => {
                setMbti(value);
                setShowMbti(false);
              }}
            />
            <MultiSelectModal
              visible={showCircle}
              data={circles}
              selected={circle}
              close={() => setShowCircle(false)}
              setSelected={setCircle}
            />
            <MultiSelectModal
              visible={showCourses}
              data={courseOptions}
              selected={courses}
              close={() => setShowCourses(false)}
              setSelected={setCourses}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SelectModal({ visible, data, close, select }: SelectModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <ScrollView style={styles.modalScroll}>
            {data.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => select(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="閉じる" onPress={close} />
        </View>
      </View>
    </Modal>
  );
}

type MultiSelectModalProps = {
  visible: boolean;
  data: string[];
  selected: string[];
  close: () => void;
  setSelected: (value: string[]) => void;
};

function MultiSelectModal({
  visible,
  data,
  selected,
  close,
  setSelected,
}: MultiSelectModalProps) {
  const toggleItem = (item: string) => {
    if (item === "選択してください") return;
    if (selected.includes(item)) {
      setSelected(selected.filter((value) => value !== item));
      return;
    }
    setSelected([...selected, item]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <ScrollView style={styles.modalScroll}>
            {data.map((item) => {
              const isSelected = selected.includes(item);
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.option,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => toggleItem(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Button title="閉じる" onPress={close} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 10,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  selectBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 10,
  },
  iconArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    marginBottom: 15,
  },
  selectedIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#4A90E2",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    maxHeight: "80%",
    padding: 20,
    borderRadius: 15,
  },
  modalScroll: {
    maxHeight: 300,
  },
  option: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "#eef6ff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
});
