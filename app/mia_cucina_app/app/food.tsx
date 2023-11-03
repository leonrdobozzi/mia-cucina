import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import FoodAdd from "../src/assets/icons/food-add.png";
import ConsumibleItem from "../src/components/ConsumibleItem";

import { useState } from "react";
import { api } from "../src/services/api";

import * as SecureStore from "expo-secure-store";
import { router, useRouter } from "expo-router";

export default function Food() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const [foods, setFoods] = useState([]);

  async function handlerGetFood() {
    const token = await SecureStore.getItemAsync("token");
    try {
      const response = await api.get("/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await handlerGetFood();
    setRefreshing(false);
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise por um prato aqui"
          />
          <Text style={styles.sessionTitle}>Sua lista de comidas</Text>
          <View style={styles.foodCardContainer}>
            {foods.map((food) => (
              <ConsumibleItem
                image={food.image}
                title={food.name}
                description={food.categoryName}
                subdescription={""}
                key={food.id}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/add-food")}
        style={styles.buttonAddFood}
      >
        <Image source={FoodAdd} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#f0f0f5",
    marginTop: 50,
    marginHorizontal: 30,
    fontFamily: "Italiana_400Regular",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  categoryText: {
    textDecorationColor: "#292929",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontFamily: "Italiana_400Regular",
    color: "#292929",
  },

  sessionTitle: {
    color: "#292929",
    fontSize: 24,
    marginLeft: 30,
    marginTop: 30,
    fontFamily: "Italiana_400Regular",
  },

  foodCardContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  buttonAddFood: {
    backgroundColor: "#181818",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    right: 15,
  },
});
