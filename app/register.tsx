// 新規登録画面です。
// メールアドレスとパスワードを受け取り、
// Firebase Auth で新しいユーザーを作成します。
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid = userCredential.user.uid;

      await setDoc(
        doc(db, "users", uid),
        {
          name: "",
          studentId: "",
          faculty: "",
          year: "",
          age: null,
          birthDate: "",
          mbti: "",
          circle: "",
          courses: "",
          avatar: "icon1",
          friends: [],
        }
      );

      Alert.alert("登録成功");

      router.replace("/profile/edit");

    } catch (error: any) {

      Alert.alert(
        "登録失敗",
        error.message
      );

    }

  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
          >

            <Text style={styles.title}>
              新規登録
            </Text>

            <TextInput
              style={styles.input}
              placeholder="大学メール"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="パスワード"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={register}
            >
              <Text style={styles.registerText}>
                新規登録
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Text style={styles.loginText}>
                ログイン画面へ戻る
              </Text>
            </TouchableOpacity>

          </ScrollView>

        </KeyboardAvoidingView>

      </TouchableWithoutFeedback>

    </SafeAreaView>
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
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
  },

  registerButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  loginText: {
    marginTop: 24,
    textAlign: "center",
    color: "#3B82F6",
    fontSize: 15,
  },

});