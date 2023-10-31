import { View, StyleSheet, Image, Text } from "react-native";

import Like from "../assets/icons/like.png";

export default function CardFeed({ image, title, sendedFor }) {
  return (
    <View style={styles.cardFeed}>
      <View style={{ position: "relative" }}>
        <View style={styles.cardLike}>
          <Image source={Like} alt={title} />
        </View>
        <Image
          style={styles.imageCardFeed}
          source={{ uri: image as string }}
          alt={title}
        />
      </View>
      <View>
        <Text style={styles.titleCardFeed}>{title}</Text>
        <Text style={styles.textCardFeed}>Enviado por: {sendedFor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardFeed: {
    backgroundColor: "#292929",
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  titleCardFeed: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Italiana_400Regular",
    marginTop: 10,
    marginLeft: 10,
  },
  textCardFeed: {
    color: "#C4C4C4",
    fontSize: 16,
    fontFamily: "Italiana_400Regular",
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  imageCardFeed: {
    width: "100%",
    height: 120,
  },
  cardLike: {
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 5,
    right: 10,
    zIndex: 99999,
  },
});
