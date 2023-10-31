import { TextInput, StyleSheet } from "react-native";

export default function FormInput({ placeholder }) {
  return <TextInput style={styles.input} placeholder={placeholder} />;
}

const styles = StyleSheet.create({
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
