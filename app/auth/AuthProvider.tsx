// Firebase 認証状態をアプリ全体で共有するコンポーネントです。
// `useAuth()` から現在のユーザー情報と読み込み状態を取得できます。
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    onAuthStateChanged,
    User
} from "firebase/auth";

import { auth } from "../../firebaseConfig";

// Firebase の認証状態が変化したときに呼ばれるリスナーを使います。

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user:null,
  loading:true
});

// `AuthProvider` はアプリ全体に認証情報を共有するためのコンポーネントです。
// 子コンポーネントから `useAuth()` でログイン済みユーザーや読み込み状態を取得できます。

export function AuthProvider({
  children
}:{
  children:React.ReactNode
}){

  const [user,setUser] =
    useState<User|null>(null);

  const [loading,setLoading] =
    useState(true);


  useEffect(()=>{

    // Firebase の auth で認証状態が変えられるたびに呼ばれる処理です。
    // 画面を開いたときも一度実行され、現在のログイン状態を user にセットします。
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser)=>{

          setUser(currentUser);

          setLoading(false);

        }
      );

    // コンポーネントが消えるときに、監視を解除します。
    return unsubscribe;

  },[]);


  return (

    <AuthContext.Provider
      value={{
        user,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth(){

  return useContext(AuthContext);

}

export default AuthProvider;