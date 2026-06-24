// アプリ起動時の画面です。
// 認証状態を見て、ログイン画面かタブ画面へ自動で遷移します。
import { Redirect } from "expo-router";

// 認証状態を取得するカスタムフックです。
import { useAuth } from "./auth/AuthProvider";

export default function Index(){

  const {
    user,
    loading
  } = useAuth();


  if(loading){
    // 認証情報の読み込み中は何も表示しません。
    return null;
  }

  if(user){
    // ログイン済みなら、タブ画面へ遷移します。
    return (
      <Redirect href="/(tabs)" />
    );
  }

  // 未ログインなら、ログイン画面へ遷移します。
  return (
    <Redirect href="/login" />
  );

}
