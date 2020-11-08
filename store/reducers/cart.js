import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";
import CartItem from "../../models/CartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedCartItem;
      if (state.items[addedProduct.id]) {
        updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const removedProduct = state.items[action.productId];
      const removedPrice = removedProduct.productPrice;
      const removedTitle = removedProduct.productTitle;

      let updatedCartItems;
      if (removedProduct.quantity > 1) {
        const removedCartItem = new CartItem(
          removedProduct.quantity - 1,
          removedPrice,
          removedTitle,
          removedProduct.sum - removedPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: removedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - removedPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updateItems = { ...state.items };
      const itemsTotal = state.items[action.productId].sum;
      delete updateItems[action.productId];
      return {
        ...state,
        items: updateItems,
        totalAmount: state.totalAmount - itemsTotal,
      };
    default:
      return state;
  }
};
