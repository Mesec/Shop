import * as actionTypes from "./actionsTypes";
import axios from "axios";

import * as cartActions from "./cart";

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START,
  };
};
export const purchaseSuccess = () => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
  };
};
export const purchaseFailed = (errors) => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    errors: errors,
  };
};
export const purchase = (purchaseData, cartData, totalPrice) => {
  const cartProducts = [];
  const quantity = [];

  console.log(cartData);
  cartData.forEach((item) => {
    cartProducts.push(item.productId);
    quantity.push({ qty: item.quantity, prodId: item.productId._id });
  });
  return (dispatch) => {
    dispatch(purchaseStart());
    axios
      .post("http://localhost:5000/orders/purchase", {
        Authorization: "Bearer " + localStorage.getItem("token"),
        address: purchaseData.address,
        phone: purchaseData.phone,
        cartProducts: cartProducts,
        quantity: quantity,
        totalPrice: totalPrice,
      })
      .then((result) => {
        dispatch(purchaseSuccess());
        dispatch(cartActions.hidePurchaseModal());
        dispatch(cartActions.clearCart());
      })
      .catch((error) => {
        dispatch(purchaseFailed(error.response.data.errors.errors));
      });
  };
};

//Get user orders
export const getUserOrdersStart = () => {
  return {
    type: actionTypes.GET_USER_ORDERS_START,
  };
};
export const getUserOrdersSuccess = (orders) => {
  return {
    type: actionTypes.GET_USER_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const getUserOrdersFailed = () => {
  return {
    type: actionTypes.GET_USER_ORDERS_FAILED,
  };
};
export const getUserOrders = () => {
  return (dispatch) => {
    dispatch(getUserOrdersStart());
    axios
      .post("http://localhost:5000/orders/get-user-orders", {
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      .then((response) => {
        dispatch(getUserOrdersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getUserOrdersFailed());
      });
  };
};
//Purchase change handler
export const purchaseChangeHandler = (event) => {
  return {
    type: actionTypes.PURCHASE_CHANGE_HANDLER,
    event: event,
  };
};
