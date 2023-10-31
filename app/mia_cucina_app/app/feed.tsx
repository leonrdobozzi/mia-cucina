import {
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import Pastas from "../src/assets/icons/pastas.png";
import Barbecue from "../src/assets/icons/barbecue.png";
import Burguer from "../src/assets/icons/burguer.png";
import React, { useEffect, useState } from "react";
import CardFeed from "../src/components/CardFeed";
import { api } from "../src/services/api";
import * as SecureStore from "expo-secure-store";

export default function Feed() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState("Carregando o feed...");

  const [refreshing, setRefreshing] = React.useState(false);

  async function handlerGetFeed() {
    const token = await SecureStore.getItemAsync("token");
    try {
      const response = await api.get("/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
    } catch (e) {
      setLoadingFeed("Nada para mostrar no feed!");
      setItems([]);
    }
  }

  useEffect(() => {
    handlerGetFeed();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    setLoadingFeed("Recarregando o feed!");
    await handlerGetFeed();
    setRefreshing(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquise por um prato aqui"
      />
      <View style={styles.categoryRow}>
        <TouchableOpacity
          onPress={() =>
            filter !== "pasta" ? setFilter("pasta") : setFilter("")
          }
          style={styles.categoryItem}
          activeOpacity={0.9}
        >
          <Image source={Pastas} />
          <View
            style={{
              display: `${filter === "pasta" ? "flex" : "none"}`,
              backgroundColor: "#808080",
              width: "10%",
              height: 5,
              marginTop: 10,
              position: "absolute",
              bottom: 10,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() =>
            filter !== "barbecue" ? setFilter("barbecue") : setFilter("")
          }
          activeOpacity={0.9}
        >
          <Image source={Barbecue} />
          <View
            style={{
              display: `${filter === "barbecue" ? "flex" : "none"}`,
              backgroundColor: "#808080",
              width: "10%",
              height: 5,
              marginTop: 10,
              position: "absolute",
              bottom: 10,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            filter !== "burguer" ? setFilter("burguer") : setFilter("")
          }
          style={styles.categoryItem}
          activeOpacity={0.9}
        >
          <Image source={Burguer} />
          <View
            style={{
              display: `${filter === "burguer" ? "flex" : "none"}`,
              backgroundColor: "#808080",
              width: "10%",
              height: 5,
              marginTop: 10,
              position: "absolute",
              bottom: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
      <Text style={styles.textSection}>Feeds Recents</Text>
      <View style={styles.cardFeedContainer}>
        {items.length <= 0 && <Text>{loadingFeed}</Text>}
        {items.map((item) => {
          if (filter === item.categoryName) {
            return (
              <CardFeed
                title={item.name}
                sendedFor={item.username}
                key={item.id}
                image={item.image}
              />
            );
          } else if (filter !== "" && filter !== item.categoryName) {
            return <Text>Não há novos feeds por aqui 😔</Text>;
          } else if (filter === "") {
            return (
              <CardFeed
                title={item.name}
                sendedFor={item.username}
                key={item.id}
                image={item.image}
              />
            );
          }
        })}
      </View>
    </ScrollView>
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
  categoryRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  categoryItem: {
    backgroundColor: "#292929",
    borderRadius: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  textSection: {
    color: "#292929",
    marginHorizontal: 20,
    fontFamily: "Italiana_400Regular",
    fontSize: 20,
    marginVertical: 20,
  },
  cardFeedContainer: {
    alignItems: "center",
    minHeight: 250,
    marginBottom: 60,
  },
});
