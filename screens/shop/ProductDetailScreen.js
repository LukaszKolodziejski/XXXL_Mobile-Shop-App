import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartAction from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const id = props.navigation.getParam("id");
  const products = useSelector((state) => state.products.availableProducts);
  const [data] = [...products.filter((product) => product.id === id)];
  const dispatch = useDispatch();

  return (
    <View style={styles.product}>
      <Image style={styles.image} source={{ uri: data.imageURL }} />
      <View style={styles.details}>
        <Text style={styles.price}>${data.price.toFixed(2)}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={() => dispatch(cartAction.addToCart(data))}
        />
      </View>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: title,
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  product: {
    width: "100%",
    backgroundColor: "#eee",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "30%",
  },
  details: {
    alignItems: "center",
    padding: 12,
  },
  price: {
    fontSize: 20,
    color: "#888",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  actions: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
