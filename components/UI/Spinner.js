import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

const Spinner = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
