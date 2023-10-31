import {
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Pastas from "../src/assets/icons/pastas.png";
import Barbecue from "../src/assets/icons/barbecue.png";
import Burguer from "../src/assets/icons/burguer.png";
import React, { useState } from "react";
import CardFeed from "../src/components/CardFeed";
import CardFeedImage from "../src/assets/imageCardFeed.png";
import BurguerFeedImage from "../src/assets/burguer-image.png";
import SaladFeedImage from "../src/assets/salada.png";

export default function Feed() {
  const [filter, setFilter] = useState("");
  const items = [
    {
      image: CardFeedImage,
      category: "barbecue",
      title: "Churrasco com chimarrão",
      sendedFor: "Manoel Churrasqueiro",
    },
    {
      image: BurguerFeedImage,
      category: "burguer",
      title: "Hamburguer Gourmet",
      sendedFor: "Paola Carosella",
    },
    {
      image: SaladFeedImage,
      category: "pasta",
      title: "Macarrão carbonara",
      sendedFor: "Leonardo Bozzi",
    },
  ];
  return (
    <ScrollView>
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
        {items.map((item) => {
          return filter === "" ? (
            <CardFeed
              title={item.title}
              sendedFor={item.sendedFor}
              key={item.image}
              image={item.image}
            />
          ) : filter === "barbecue" && item.category === "barbecue" ? (
            <CardFeed
              title={item.title}
              sendedFor={item.sendedFor}
              key={item.image}
              image={item.image}
            />
          ) : filter === "burguer" && item.category === "burguer" ? (
            <CardFeed
              title={item.title}
              sendedFor={item.sendedFor}
              key={item.image}
              image={item.image}
            />
          ) : filter === "pasta" && item.category === "pasta" ? (
            <CardFeed
              title={item.title}
              sendedFor={item.sendedFor}
              key={item.image}
              image={item.image}
            />
          ) : (
            ""
          );
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
