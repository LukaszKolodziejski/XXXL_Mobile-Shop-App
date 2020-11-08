import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsAction from "../../store/actions/products";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate({
      routeName: "EditProducts",
      params: {
        id,
      },
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure ?", "Do you really want to delete this item ?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(productsAction.deleteProduct(id)),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <ProductItem data={item} onSelected={editProductHandler}>
      <Button
        color={Colors.primary}
        title="   Edit    "
        onPress={() => editProductHandler(item.id)}
      />
      <Button
        color={Colors.primary}
        title="Delete"
        // onPress={() => dispatch(productsAction.deleteProduct(item.id))}
        onPress={() => deleteHandler(item.id)}
      />
    </ProductItem>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName="ios-add-circle-outline"
          color="white"
          onPress={() => navData.navigation.navigate("EditProducts")}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
});
