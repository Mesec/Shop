import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  cartProducts: [],
  quantity: 1,
  loading: false,
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
      console.log(state.cartProducts);
      return {
        ...state,
        cartProducts: action.cartProducts,
        loading: false,
      };
    case actionTypes.GET_CART_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
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
