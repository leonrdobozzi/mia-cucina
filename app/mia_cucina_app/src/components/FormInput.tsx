import { TextInput, StyleSheet } from "react-native";

export default function FormInput({
  placeholder,
  emailHandler = undefined,
  passwordHandler = undefined,
}) {
  return (
    <TextInput
      onChangeText={(e) =>
        emailHandler ? emailHandler(e) : passwordHandler(e)
      }
      style={styles.input}
      placeholder={placeholder}
    />
  );
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
