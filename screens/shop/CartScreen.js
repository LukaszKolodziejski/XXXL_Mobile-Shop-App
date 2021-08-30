import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartAction from "../../store/actions/cart";
import * as orderAction from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmount = Math.abs(cartTotalAmount.toFixed(2));
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        quantity: state.cart.items[key].quantity,
        productPrice: state.cart.items[key].productPrice,
        productTitle: state.cart.items[key].productTitle,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId);
  });

  const removeItemHandler = (id) => dispatch(cartAction.removeFromCart(id));

  const renderItem = ({ item }) => (
    <CartItem data={item} onRemove={removeItemHandler} deletable />
  );

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderAction.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}> ${totalAmount}</Text>
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <Button
            title="Order Now"
            color={Colors.primary}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#eee",
  },
  summaryText: {
    fontSize: 21,
  },
  amount: {
    color: Colors.primary,
  },
});
