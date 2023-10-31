import { View, Image, Text, StyleSheet } from "react-native";

import WineImage from "../assets/vinho.png";

export default function WineItem() {
  return (
    <View style={styles.wineCard}>
      <Image style={styles.wineCardImage} source={WineImage} />
      <Text style={styles.wineCardTitle}>Tempos de Góes</Text>
      <Text style={styles.wineCardSubtitle}>Cabernet Sauvignon</Text>
      <Text style={styles.wineCardSubtitle}>Seco</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
