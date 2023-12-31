import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  RefreshControl,
  View,
} from "react-native";

import WineAdd from "../src/assets/icons/wine-add.png";
import ConsumibleItem from "../src/components/ConsumibleItem";

import * as SecureStore from "expo-secure-store";
import { api } from "../src/services/api";
import React, { useEffect, useState } from "react";

export default function Wine() {
  const [refreshing, setRefreshing] = useState(false);

  const [wines, setWines] = useState([]);

  async function handlerGetWine() {
    const token = await SecureStore.getItemAsync("token");
    try {
      const response = await api.get("/wine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWines(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handlerGetWine();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    await handlerGetWine();
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
            placeholder="Pesquise por um vinho aqui"
          />
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Cabernet Sauvignon</Text>
            <Text style={styles.categoryText}>Malbec</Text>
          </View>
          <Text style={styles.sessionTitle}>Sua lista de vinhos</Text>
          <View style={styles.wineCardContainer}>
            {wines.map((wine) => (
              <ConsumibleItem
                title={wine.name}
                description={wine.grape}
                subdescription={wine.type}
                key={wine.id}
                image={wine.wine_image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonAddWine}>
        <Image source={WineAdd} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#f0f0f5",
    marginVertical: 50,
    marginHorizontal: 30,
    fontFamily: "Italiana_400Regular",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  categoryContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
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
  wineCard: {
    backgroundColor: "#292929",
    width: "45%",
    borderRadius: 10,
    paddingBottom: 20,
    overflow: "hidden",
    marginTop: 30,
  },

  wineCardContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  wineCardImage: {
    width: "100%",
  },

  wineCardTitle: {
    color: "#fff",
    fontFamily: "Italiana_400Regular",
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 5,
  },

  wineCardSubtitle: {
    color: "#808080",
    marginVertical: 2,
    fontFamily: "Italiana_400Regular",
    marginHorizontal: 5,
  },
  buttonAddWine: {
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
