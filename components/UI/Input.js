import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ValidMessage from "../user/ValidMessage";

const Input = (props) => {
  const { label, text, data, keyProduct, onTextChange } = props;
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>{label}:</Text>
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={(value) => onTextChange(text, value)}
          value={data.imputValues[text]}
        />
      </View>
      <ValidMessage
        keyProduct={keyProduct}
        kindIsValid={data.inputValidities[text]}
        text={text}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    maxWidth: "65%",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
});
