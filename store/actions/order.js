import axios from "../../data/axios-products";
import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await axios.get(`/orders/${userId}.json`).then((res) => {
      const orders = [];
      for (const key in res.data) {
        const newData = new Order(
          key,
          res.data[key].items,
          res.data[key].amount,
          res.data[key].date
        );
        orders.push(newData);
      }
      dispatch({
        type: SET_ORDER,
        orders,
      });
    });
  };
};

export const addOrder = (items, amount) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    const date = new Date();
    await axios
      .post(`/orders/${userId}.json?auth=${token}`, {
        items,
        amount,
        date: date.toISOString(),
      })
      .then((res) => {
        dispatch({
          type: ADD_ORDER,
          orderData: {
            id: res.data.name,
            items,
            amount,
            date,
          },
        });
      });
  };
};
