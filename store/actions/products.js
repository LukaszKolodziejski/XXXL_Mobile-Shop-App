import axios from "../../data/axios-products";
import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProduct = () => (dispatch, getState) => {
  const { userId } = getState().auth;
  axios
    .get("/products.json")
    .then((res) => {
      if (!res.ok) {
        const loadedProducts = [];
        for (const key in res.data) {
          loadedProducts.push(
            new Product(
              key,
              res.data[key].ownerId,
              res.data[key].title,
              res.data[key].imageURL,
              res.data[key].description,
              res.data[key].price
            )
          );
        }
        dispatch({
          type: "SET_PRODUCT",
          products: loadedProducts,
          userProducts: loadedProducts.filter(
            (prod) => prod.ownerId === userId
          ),
        });
      } else {
        throw new Error("Something went wrong!");
      }
    })
    .catch((err) => err);
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios.delete(`/products/${productId}.json?auth=${token}`);

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  };
};

export const createProduct = (title, description, imageURL, price) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;

    await axios
      .post(`/products.json?auth=${token}`, {
        title,
        description,
        imageURL,
        price,
        ownerId: userId,
      })
      .then((res) => {
        dispatch({
          type: CREATE_PRODUCT,
          productData: {
            id: res.data.name,
            title,
            description,
            imageURL,
            price,
            ownerId: userId,
          },
        });
      });
  };
};

export const updateProduct = (id, title, description, imageURL, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios.patch(`/products/${id}.json?auth=${token}`, {
      title,
      description,
      imageURL,
      price,
    });

    dispatch({
      type: UPDATE_PRODUCT,
      id,
      productData: {
        title,
        description,
        imageURL,
        price,
      },
    });
  };
};
