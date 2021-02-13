import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ValidMessage = (props) =>
  props.kindIsValid ? null : (
    <View style={styles.valid}>
      <Text style={styles.validText}>
        Please enter a valid {props.text} !!!
      </Text>
    </View>
  );

export default ValidMessage;

const styles = StyleSheet.create({
  valid: {
    paddingLeft: "35%",
  },
  validText: {
    color: "red",
  },
});
