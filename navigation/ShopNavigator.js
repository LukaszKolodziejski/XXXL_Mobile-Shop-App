import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import * as authAction from "../store/actions/auth";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";

import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductsScreen from "../screens/user/EditProductsScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={25} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-list" size={25} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

const ManageProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProducts: EditProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="ios-build" size={25} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerLabel: "Shop",
      },
    },
    Orders: OrdersNavigator,
    ManageProducts: {
      screen: ManageProductsNavigator,
      navigationOptions: {
        drawerLabel: "Manage Products",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontSize: 18,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      const logout = () => dispatch(authAction.logout());
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horisontal: "never" }}>
            <DrawerItems {...props} />
            <Button title="Logout" color={Colors.primary} onPress={logout} />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

// export default createAppContainer(ShopNavigator);
export default createAppContainer(MainNavigator);
