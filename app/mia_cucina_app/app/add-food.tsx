import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonRouter from "../src/components/ButtonRouter";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { api } from "../src/services/api";

export default function addFood() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>();

  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [preparationTime, setPreparationTime] = useState<string>();
  const [dificulty, setDificulty] = useState<string>();
  const [ingredients, setIngredients] = useState<string>();
  const [revenue, setRevenue] = useState<string>();

  function handleCancelFood() {
    router.push("/food");
  }

  async function handlerImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.assets[0]) setPreview(result.assets[0].uri);
    } catch (e) {
      return null;
    }
  }

  async function handleCreateFood() {
    if (preview) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", {
        uri: preview,
        name: "image.png",
        type: "image/png",
      } as any);

      const uploadResponse = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const coverUrl = uploadResponse.data.fileUrl;

      const token = await SecureStore.getItemAsync("token");

      await api.post(
        "/food",
        {
          name,
          category,
          preparation_time: preparationTime,
          dificulty,
          revenue,
          image: coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      router.push("/food");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar uma nova comida</Text>
      <TouchableOpacity
        style={styles.addImageContainer}
        onPress={() => handlerImagePicker()}
      >
        {!preview ? (
          <Text style={styles.addImage}>Adicionar imagem</Text>
        ) : (
          <Image style={styles.image} source={{ uri: preview }} />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setName(e)}
        placeholder={"Nome"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(e) => setCategory(e)}
        placeholder={"Categoria"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(e) => setPreparationTime(e)}
        placeholder={"Tempo de preparo"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(e) => setDificulty(e)}
        placeholder={"Dificuldade"}
      />
      <Text style={styles.subtitles}>
        Descreva como preparar a receita por passos:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setRevenue(e)}
        placeholder={"Receita"}
      />

      <TouchableOpacity></TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <ButtonRouter text={"Cadastrar"} route={handleCreateFood} />
        <ButtonRouter text={"Cancelar"} route={handleCancelFood} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c4c4c430",
    height: "100%",
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Italiana_400Regular",
  },

  subtitles: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Italiana_400Regular",
  },
  buttonsContainer: {
    alignItems: "center",
  },
  addImageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  addImage: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Italiana_400Regular",
    backgroundColor: "#292929",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "50%",
    color: "#fff",
  },

  image: {
    width: 100,
    height: 70,
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
});
