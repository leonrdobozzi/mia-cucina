import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function ButtonRouter({ route, text }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      activeOpacity={0.8}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Fazer login</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Italiana_400Regular",
    paddingLeft: 20,
  },
});
