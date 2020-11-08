import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const viewDetailHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        id,
        title,
      },
    });
  };

  const renderItem = ({ item }) => (
    <ProductItem data={item} onSelected={viewDetailHandler}>
      <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => viewDetailHandler(item.id, item.title)}
      />
      <Button
        color={Colors.primary}
        title="To Cart"
        onPress={() => dispatch(cartAction.addToCart(item))}
      />
    </ProductItem>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All products",
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
          title="Basket"
          iconName="ios-basket"
          color="white"
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
  },
});
