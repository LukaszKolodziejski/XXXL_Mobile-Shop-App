import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/actions/cart";
import * as productsAction from "../../store/actions/products";
import Colors from "../../constants/Colors";
import Spinner from "../../components/UI/Spinner";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsAction.fetchProduct());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => willFocusSub.remove();
  }, [loadProducts]);

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

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (isLoading) return <Spinner />;

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
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
