import { ADD_ORDER } from "../actions/order";
import Order from "../../models/Order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { orderData } = action;
      const newOrder = new Order(
        new Date().toString(),
        orderData.items,
        orderData.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) };
    default:
      return state;
  }
};
