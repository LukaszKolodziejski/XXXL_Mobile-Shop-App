import { ADD_ORDER, SET_ORDER } from "../actions/order";
import Order from "../../models/Order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return { ...state, orders: state.orders.concat(newOrder) };
    case SET_ORDER:
      return { orders: action.orders };
    default:
      return state;
  }
};
