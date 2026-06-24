import { Stack } from "expo-router";

import {
  AuthProvider
} from "./auth/AuthProvider";


export default function Layout(){

  return (

    <AuthProvider>

      <Stack>

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