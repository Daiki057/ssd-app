// 新規登録画面です。
// メールアドレスとパスワードを受け取り、
// Firebase Auth で新しいユーザーを作成します。
import { useState } from "react";

import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
  db,
} from "../firebaseConfig";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  router,
} from "expo-router";

import {
  UNIVERSITY_DOMAIN,
  ALLOW_EMAILS,
} from "../constants/emailConfig";

export default function Register() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const register = async () => {

    const formattedEmail =
      email.trim().toLowerCase();

    const domain =
      formattedEmail.split("@")[1];

    const isUniversityEmail =
      domain === UNIVERSITY_DOMAIN;

    const isAllowedEmail =
      ALLOW_EMAILS.includes(
        formattedEmail
      );

    if (
      !isUniversityEmail &&
      !isAllowedEmail
    ) {

      Alert.alert(
        "登録できません",
        "長野大学のメールアドレス（@stu.nagano.ac.jp）または、運営が許可したメールアドレスのみ登録できます。"
      );

      return;
    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formattedEmail,
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
          name: "",
          studentId: "",
          faculty: "",
          mbti: "",
          friends: [],
        }

      );

      Alert.alert(
        "登録成功"
      );

      router.replace(
        "/profile/edit"
      );

    } catch (error: any) {

      Alert.alert(
        "登録失敗",
        error.message
      );

    }

  };

  return (

    <View
      style={styles.container}
    >

      <TextInput
        placeholder="大学メール"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },

});