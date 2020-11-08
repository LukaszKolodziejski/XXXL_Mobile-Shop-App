import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ProductItem = (props) => {
  const { data } = props;
  return (
    <View style={styles.product}>
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.5}
        onPress={() => props.onSelected(data.id, data.title)}
      >
        <Image style={styles.image} source={{ uri: data.imageURL }} />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.price}>${data.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>{props.children}</View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    width: "100%",
    backgroundColor: "#eee",
    marginVertical: 8, 
    elevation: 10,
    borderRadius: 30,
    borderWidth: 2,
    height: 300,
    overflow: "hidden",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});
