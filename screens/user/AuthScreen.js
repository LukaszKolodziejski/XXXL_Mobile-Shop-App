import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import AuthInput from "../../components/UI/AuthInput";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authAction from "../../store/actions/auth";
import Spinner from "../../components/UI/Spinner";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.imputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      imputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const errorMessage = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    imputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) Alert.alert("Data Error !!!", errorMessage, [{ text: "Okay" }]);
  }, [error]);

  const authHandler = () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input !!!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setIsLoading(true);
    setError(false);
    const { email, password } = formState.imputValues;
    isSignUpMode
      ? dispatch(authAction.signup(email, password))
      : dispatch(authAction.signin(email, password));

    setError(errorMessage ? true : false);
    setIsLoading(false);
  };

  const textChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) return <Spinner />;

  useEffect(() => {
    if (token) props.navigation.navigate("Shop");
  }, [token]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient colors={["#ffedff", "#ffa3af"]} style={styles.gradient}>
        <View style={styles.screen}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={-200}
          >
            <Card>
              <ScrollView>
                <View style={styles.container}>
                  <AuthInput
                    id="email"
                    label="E-mail"
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="Please enter a valid email address."
                    onInputChange={textChangeHandler}
                    initialValue=""
                  />
                  <AuthInput
                    id="password"
                    label="Password"
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={6}
                    autoCapitalize="none"
                    errorText="Please enter a valid password."
                    onInputChange={textChangeHandler}
                    initialValue=""
                  />
                  <View style={styles.buttonContainer}>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Button
                        title={isSignUpMode ? "Sign Up" : "Login"}
                        color={Colors.primary}
                        onPress={authHandler}
                      />
                    )}
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title={`Swich to ${isSignUpMode ? "Login" : "Sign Up"}`}
                      color={Colors.accent}
                      onPress={() => setIsSignUpMode((prevState) => !prevState)}
                    />
                  </View>
                </View>
              </ScrollView>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

AuthScreen.navigationOptions = () => {
  return {
    headerTitle: "Authenticate",
  };
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  container: {
    paddingVertical: 20,
    marginHorizontal: 22,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
