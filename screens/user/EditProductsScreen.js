import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsAction from "../../store/actions/products";

const EditProductsScreen = (props) => {
  const productId = props.navigation.getParam("id");
  const userProducts = useSelector((state) => state.products.userProducts);
  const product = userProducts.find((prod) => prod.id === productId);

  const [title, setTitle] = useState(product ? product.title : "");
  const [price, setPrice] = useState(product ? product.price.toString() : "");
  const [imageURL, setImageURL] = useState(product ? product.imageURL : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (product) {
      dispatch(
        productsAction.updateProduct(
          productId,
          title,
          description,
          imageURL,
          +price
        )
      );
    } else {
      dispatch(
        productsAction.createProduct(title, description, imageURL, +price)
      );
    }
  }, [dispatch, productId, title, description, imageURL, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Title:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Price:</Text>
          <TextInput
            style={styles.input}
            // keyboardType="numeric"
            onChangeText={(text) => setPrice(text)}
            value={price}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Description:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Image URL:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setImageURL(text)}
            value={imageURL}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

EditProductsScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("id")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName="ios-checkmark-circle"
          color="white"
          onPress={() => {
            submitFn();
            navData.navigation.navigate("UserProducts");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
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
