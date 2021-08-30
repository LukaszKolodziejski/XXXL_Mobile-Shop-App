import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import OrderItem from "../../components/shop/OrderItem";
import * as orderAction from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(orderAction.fetchOrders());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const renderItem = ({ item }) => <OrderItem data={item} />;

  if (isLoading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No orders found, maybe start ordering some products ?</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          color="white"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

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
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
