import * as actionTypes from "./actionsTypes";
import * as productActions from "./products";
import axios from "axios";

//  Add to cart actions
export const addToCartStart = () => {
  return {
    type: actionTypes.ADD_TO_CART_START,
  };
};
export const addToCartSuccess = () => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
  };
};
export const addToCartFailed = () => {
  return {
    type: actionTypes.ADD_TO_CART_FAILED,
  };
};
export const addToCart = (cartData) => {
  return (dispatch) => {
    dispatch(addToCartStart());
    axios
      .post("http://localhost:5000/cart/add-to-cart", {
        Authorization: "Bearer " + localStorage.getItem("token"),
        cartData: cartData,
      })
      .then((result) => {
        dispatch(addToCartSuccess());
      })
      .then(() => {
        dispatch(getCartProducts());
      })
      .catch((error) => {
        dispatch(addToCartFailed());
      });
  };
};

// Get cart products from db
export const getCartProductsStart = () => {
  return {
    type: actionTypes.GET_CART_PRODUCTS_START,
  };
};
export const getCartProductsSuccess = (cartProducts) => {
  return {
    type: actionTypes.GET_CART_PRODUCTS_SUCCESS,
    cartProducts: cartProducts,
  };
};
export const getCartProductsFailed = () => {
  return {
    type: actionTypes.GET_CART_PRODUCTS_FAILED,
  };
};
export const getCartProducts = () => {
  return (dispatch) => {
    dispatch(getCartProductsStart());
    axios
      .post("http://localhost:5000/cart/get-cart-products", {
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      .then((response) => {
        dispatch(getCartProductsSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Clear the Cart
export const clearCartStart = () => {
  return {
    type: actionTypes.CLEAR_CART_START,
  };
};
export const clearCartSuccess = () => {
  return {
    type: actionTypes.CLEAR_CART_SUCCESS,
  };
};
export const clearCartFailed = () => {
  return {
    type: actionTypes.CLEAR_CART_FAILED,
  };
};
export const clearCart = () => {
  return (dispatch) => {
    dispatch(clearCartStart());
    axios
      .post("http://localhost:5000/cart/clear-cart", {
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      .then((response) => {
        dispatch(clearCartSuccess());
        dispatch(getCartProducts());
      })
      .catch((err) => {
        dispatch(clearCartFailed());
      });
  };
};

//  Increase || Decrease quantity
export const increaseQuantity = (maxQuantity) => {
  return {
    type: actionTypes.INCREASE_QUANTITY,
    maxQuantity: maxQuantity,
  };
};
export const decreaseQuantity = () => {
  return {
    type: actionTypes.DECREASE_QUANTITY,
  };
};
