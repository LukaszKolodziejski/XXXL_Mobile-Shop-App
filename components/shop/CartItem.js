import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = (props) => {
  const { data } = props;

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{data.quantity} </Text>
        <Text style={styles.mainText}>{data.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${data.sum.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={() => props.onRemove(data.productId)}
            style={styles.deleteButton}
          >
            <Ionicons name="ios-trash" size={31} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#aaa",
    marginVertical: 8,
    padding: 10,
    justifyContent: "space-between",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#555",
    fontSize: 18,
  },
  mainText: {
    fontSize: 15,
    fontWeight: "700",
  },
  deleteButton: { marginLeft: 20 },
});
