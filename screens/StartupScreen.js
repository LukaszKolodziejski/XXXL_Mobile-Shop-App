import React, { useState, useEffect, useCallback, useReducer } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import * as authAction from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const data = JSON.parse(userData);
      const { token, userId, expiryDate } = data;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authAction.auth(token, userId, expirationTime));
      props.navigation.navigate("Shop");
    };
    tryLogin();
  }, [dispatch]);

  return (
    <LinearGradient colors={["#ffedff", "#ffa3af"]} style={styles.gradient}>
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </LinearGradient>
  );
};

StartupScreen.navigationOptions = () => {
  return {
    headerTitle: "Startup",
  };
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  container: {
    paddingVertical: 20,
    marginHorizontal: 22,
    alignItems: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
