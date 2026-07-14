// ログイン画面です。
// メールアドレスとパスワードを受け取り、
// Firebase Auth でサインインします。
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { router } from "expo-router";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.replace("/(tabs)");

    } catch (error: any) {

      Alert.alert(
        "ログイン失敗",
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
              SSD
            </Text>

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

            <TouchableOpacity
              style={styles.loginButton}
              onPress={login}
            >
              <Text style={styles.loginText}>
                ログイン
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerText}>
                アカウントを作成する
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
    fontSize: 32,
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

  loginButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  registerText: {
    marginTop: 24,
    textAlign: "center",
    color: "#3B82F6",
    fontSize: 15,
  },

});