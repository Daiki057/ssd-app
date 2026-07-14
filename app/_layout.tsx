// アプリ全体のルートレイアウトです。
// `AuthProvider` で認証状態を共有し、
// `login` と `(tabs)` の画面を切り替えます。
import { Stack } from "expo-router";

// アプリ全体のルートレイアウトです。
// ここで `AuthProvider` をラップして、子画面でログイン状態を共有します。
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  AuthProvider
} from "./auth/AuthProvider";

export default function Layout(){

  return (

    <AuthProvider>

      <Stack>

        {/* ログイン画面と、ログイン後のタブ画面を切り替える設定です。 */}
        <Stack.Screen
          name="login"
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown:false
          }}
        />

      </Stack>

    </AuthProvider>

  );

}