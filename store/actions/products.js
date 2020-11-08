export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const createProduct = (title, description, imageURL, price) => ({
  type: CREATE_PRODUCT,
  productData: {
    title,
    description,
    imageURL,
    price,
  },
});

export const updateProduct = (id, title, description, imageURL, price) => ({
  type: UPDATE_PRODUCT,
  id,
  productData: {
    title,
    description,
    imageURL,
    price,
  },
});
