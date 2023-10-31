import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import BgImage from "../src/assets/app-bg.png";
import { useRouter } from "expo-router";
import ButtonRouter from "../src/components/ButtonRouter";
import FormInput from "../src/components/FormInput";

import { api } from "../src/services/api";
import { useState } from "react";

import * as SecureStore from "expo-secure-store";

export default function Login() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();

  const router = useRouter();

  async function handleAuth() {
    try {
      if (email === "" && password === "") throw new Error();
      const response = await api.post("/auth", {
        email,
        password,
      });

      const { token } = response.data;

      await SecureStore.setItemAsync("token", token);
      router.push("/feed");
    } catch (e) {
      Alert.alert("User not found, please insert valid credentials!");
      return e;
    }
  }

  function handlerInputEmailValue(value) {
    setEmail(value);
  }

  function handlerInputPasswordValue(value) {
    setPassword(value);
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={BgImage}>
        <View>
          <Text style={styles.title}>mia cucina</Text>
          <Text style={styles.subtitle}>
            Entre com sua conta para aproveitar o aplicativo.
          </Text>
        </View>
        <View>
          <FormInput
            emailHandler={handlerInputEmailValue}
            placeholder={"E-mail"}
          />
          <FormInput
            passwordHandler={handlerInputPasswordValue}
            placeholder={"Senha"}
          />
          <ButtonRouter text={"Fazer Login"} route={handleAuth} />
        </View>
        <View>
          <Text style={styles.textSpan}>ou</Text>
          <Text
            style={styles.textRedirect}
            onPress={() => router.push("/register")}
          >
            Crie uma nova conta
          </Text>
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
    marginTop: 20,
  },
  input: {
    backgroundColor: "#FFF",
    color: "#292929",
    fontSize: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 282,
    fontFamily: "Italiana_400Regular",
    marginVertical: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Italiana_400Regular",
    paddingLeft: 20,
  },
  textSpan: {
    color: "#292929",
    fontSize: 16,
    textAlign: "center",
  },
  textRedirect: {
    color: "#292929",
    fontSize: 16,
    textAlign: "center",
    textDecorationColor: "#292929",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    marginTop: 30,
  },
});
