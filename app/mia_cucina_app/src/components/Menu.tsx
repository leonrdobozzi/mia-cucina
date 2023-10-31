import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import HomeImage from "../assets/icons/home.png";
import WineImage from "../assets/icons/wine.png";
import FoodImage from "../assets/icons/food.png";
import PeopleImage from "../assets/icons/profile.png";
import { usePathname, useRouter } from "expo-router";

import * as SecureStore from "expo-secure-store";

export default function Menu() {
  const path = usePathname();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.menuWrapper}>
        <TouchableOpacity
          style={{ alignItems: "center", position: "relative" }}
          onPress={() => router.push("/feed")}
        >
          <Image source={HomeImage} />
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: "#ff0000",
              position: "absolute",
              bottom: -8,
              display: path === "/feed" ? "flex" : "none",
              borderRadius: 30,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", position: "relative" }}
          onPress={() => router.push("/wine")}
        >
          <Image source={WineImage} />
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: "#ff0000",
              position: "absolute",
              bottom: -8,
              display: path === "/wine" ? "flex" : "none",
              borderRadius: 30,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", position: "relative" }}
          onPress={() => router.push("/food")}
        >
          <Image source={FoodImage} />
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: "#ff0000",
              position: "absolute",
              bottom: -8,
              display: path === "/food" ? "flex" : "none",
              borderRadius: 30,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await SecureStore.setItemAsync("token", "");
            router.push("/");
          }}
        >
          <Image source={PeopleImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    position: "absolute",
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  menuWrapper: {
    width: "85%",
    backgroundColor: "#fff",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
});
