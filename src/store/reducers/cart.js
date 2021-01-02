import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  cartProducts: [],
  quantity: 1,
  loading: false,
  isModalShown: false,
  totalPrice: 0,
  vat: 0,
  // isUserAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Add to cart
    case actionTypes.ADD_TO_CART_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        quantity: 1,
        loading: false,
      };
    case actionTypes.ADD_TO_CART_FAILED:
      return {
        ...state,
        loading: false,
      };

    //Get Cart
    case actionTypes.GET_CART_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_CART_PRODUCTS_SUCCESS:
      let totalPrice = 0;
      action.cartProducts.forEach((product) => {
        totalPrice += product.quantity * product.productId.price;
      });
      let vat = (0.2 * totalPrice).toFixed(2);
      return {
        ...state,
        cartProducts: action.cartProducts,
        loading: false,
        totalPrice: totalPrice,
        vat: vat,
        // isUserAuth: true,
      };
    case actionTypes.GET_CART_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        // isUserAuth: action.isAuth,
      };

    //Clear the Cart
    case actionTypes.CLEAR_CART_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartProducts: [],
      };
    case actionTypes.CLEAR_CART_FAILED:
      return {
        ...state,
        loading: true,
      };

    //Change Quantity
    case actionTypes.INCREASE_QUANTITY:
      let incQuantity = state.quantity;
      if (incQuantity < action.maxQuantity) {
        incQuantity++;
      }
      return {
        ...state,
        quantity: incQuantity,
      };
    case actionTypes.DECREASE_QUANTITY:
      let decQuantity = state.quantity;
      if (decQuantity > 1) {
        decQuantity--;
      } else {
        decQuantity = 1;
      }
      return {
        ...state,
        quantity: decQuantity,
      };
    //Modal controls
    case actionTypes.SHOW_PURCHASE_MODAL:
      return {
        ...state,
        isModalShown: true,
      };
    case actionTypes.HIDE_PURCHASE_MODAL:
      return {
        ...state,
        isModalShown: false,
      };
    //Disable input errors
    case actionTypes.DISABLE_ERRORS:
      return {
        ...state,
        errors: false,
      };

    default:
      return state;
  }
};

export default reducer;
