import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyD6LKfIZrvLEoO_9Hn-c9Epv7Yrh2_pox0";
const REST_API = "https://identitytoolkit.googleapis.com/v1/accounts:";
const URL_SIGN_UP = `${REST_API}signUp?key=${API_KEY}`;
const URL_SIGN_IN = `${REST_API}signInWithPassword?key=${API_KEY}`;

export const ERROR = "ERROR";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
// let timer = 3600 * 1000;
let timer;

export const auth = (token, userId, expiryTime) => (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({ type: AUTH, token, userId });
};

const clearLogoutTimer = () => (timer ? clearTimeout(timer) : null);

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
    // }, expirationTime / 1000); // Time: 3.6s
  }, expirationTime / 60); // Time: 1min
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

export const signup = (email, password) => {
  return (dispatch) => {
    axios
      .post(URL_SIGN_UP, { email, password, returnSecureToken: true })
      .then((res) => {
        const { idToken, localId, expiresIn } = res.data;
        const expirationDate = new Date(
          new Date().getTime() + parseInt(expiresIn) * 1000
        );
        const expiryNumber = parseInt(expiresIn) * 1000;
        dispatch(auth(idToken, localId, expiryNumber));
        saveDataToStorage(idToken, localId, expirationDate);
      })
      .catch((err) => dispatch({ type: ERROR, error: err.message }));
  };
};

export const signin = (email, password) => {
  return (dispatch) => {
    axios
      .post(URL_SIGN_IN, { email, password, returnSecureToken: true })
      .then((res) => {
        const { idToken, localId, expiresIn } = res.data;
        const expirationDate = new Date(
          new Date().getTime() + parseInt(expiresIn) * 1000
        );
        const expiryNumber = parseInt(expiresIn) * 1000;
        dispatch(auth(idToken, localId, expiryNumber));
        saveDataToStorage(idToken, localId, expirationDate);
      })
      .catch((err) => dispatch({ type: ERROR, error: err.message }));
  };
};

const saveDataToStorage = (token, userId, expiresIn) => {
  const expiryDate = expiresIn.toISOString();
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate })
  );
};
