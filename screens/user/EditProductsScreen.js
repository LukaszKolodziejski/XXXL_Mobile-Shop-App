import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import * as productsAction from "../../store/actions/products";
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

const EditProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const productId = props.navigation.getParam("id");
  const userProducts = useSelector((state) => state.products.userProducts);
  const product = userProducts.find((prod) => prod.id === productId);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    imputValues: {
      title: product ? product.title : "",
      price: product ? product.price.toString() : "",
      imageURL: product ? product.imageURL : "",
      description: product ? product.description : "",
    },
    inputValidities: {
      title: product ? true : false,
      price: product ? true : false,
      imageURL: product ? true : false,
      description: product ? true : false,
    },
    formIsValid: product ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input !!!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    const { title, price, imageURL, description } = formState.imputValues;
    setIsLoading(true);
    if (product) {
      await dispatch(
        productsAction.updateProduct(
          productId,
          title,
          description,
          imageURL,
          +price
        )
      );
    } else {
      await dispatch(
        productsAction.createProduct(title, description, imageURL, +price)
      );
    }
    setIsLoading(false);
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputId, text) => {
    const isValid = text.trim().length > 0 ? true : false;
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputId,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.screen}>
            <Input
              keyProduct={product}
              label="Title"
              text="title"
              data={formState}
              onTextChange={textChangeHandler}
            />
            <Input
              keyProduct={product}
              label="Price"
              text="price"
              keyboardType="decimal-pad"
              data={formState}
              onTextChange={textChangeHandler}
            />
            <Input
              keyProduct={product}
              label="Description"
              text="description"
              data={formState}
              onTextChange={textChangeHandler}
              multiline
              numberOfLines={3}
            />
            <Input
              keyProduct={product}
              label="Image URL"
              text="imageURL"
              data={formState}
              onTextChange={textChangeHandler}
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
          onPress={() => submitFn()}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
});
