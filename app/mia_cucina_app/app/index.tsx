import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import BgImage from "../src/assets/app-bg.png";
import ArrowEntry from "../src/assets/icons/arrow-entrance.png";

import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground source={BgImage} style={styles.image}>
        <View>
          <Text style={styles.title}>mia cucina</Text>
          <Text style={styles.subtitle}>
            O seu diário de comidas, bebidas e um belo feed de receitas{" "}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            activeOpacity={0.9}
            style={styles.button}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.buttonText}>Começar</Text>
            </View>
            <View style={styles.arrowButton}>
              <Image source={ArrowEntry} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    color: "#1e1e1e",
    fontFamily: "Italiana_400Regular",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#1e1e1e",
    fontFamily: "Italiana_400Regular",
  },
  button: {
    backgroundColor: "#292929",
    borderRadius: 31,
    width: 282,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Italiana_400Regular",
    paddingLeft: 20,
  },
  arrowButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 31,
    marginRight: 5,
    width: 67,
    height: 40,
  },
});
