import { View, Image, Text, StyleSheet } from "react-native";

export default function WineItem({
  title,
  description,
  subdescription,
  image,
}) {
  return (
    <View style={styles.wineCard}>
      <Image style={styles.wineCardImage} source={{ uri: image }} />
      <Text style={styles.wineCardTitle}>{title}</Text>
      <Text style={styles.wineCardSubtitle}>{description}</Text>
      {subdescription && (
        <Text style={styles.wineCardSubtitle}>{subdescription}</Text>
      )}
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
    height: 100,
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
