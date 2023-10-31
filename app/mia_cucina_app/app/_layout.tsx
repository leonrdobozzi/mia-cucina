import { SplashScreen, Stack } from "expo-router";

import { useFonts, Italiana_400Regular } from "@expo-google-fonts/italiana";
import Menu from "../src/components/Menu";
import { usePathname } from "expo-router";

import AppLoading from "expo-app-loading";

export default function Layout() {
  const path = usePathname();
  const [fontsLoaded] = useFonts({
    Italiana_400Regular,
  });

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
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="feed" />
        <Stack.Screen name="wine" />
      </Stack>
      {path !== "/" && path !== "/login" && path !== "/register" && <Menu />}
    </>
  );
}
