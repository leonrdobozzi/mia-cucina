import React, { useEffect, useState } from "react";
import { SplashScreen, Stack, usePathname } from "expo-router";

import { useFonts, Italiana_400Regular } from "@expo-google-fonts/italiana";
import Menu from "../src/components/Menu";
import * as SecureStore from "expo-secure-store";

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null);

  const path = usePathname();
  const [fontsLoaded] = useFonts({
    Italiana_400Regular,
  });

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      setIsUserAuthenticated(!!token);
    });
  }, []);

  if (!fontsLoaded) return SplashScreen.preventAutoHideAsync();

  SplashScreen.hideAsync();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="login" redirect={isUserAuthenticated} />
        <Stack.Screen name="register" redirect={isUserAuthenticated} />
        <Stack.Screen name="feed" />
        <Stack.Screen name="wine" />
        <Stack.Screen name="food" />
      </Stack>
      {path !== "/" && path !== "/login" && path !== "/register" && <Menu />}
    </>
  );
}
