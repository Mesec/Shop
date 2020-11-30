import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  purchaseData: {
    address: "",
    phone: "",
  },
  loading: false,
  errors: false,
  userOrders: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Purchase reducers
    case actionTypes.PURCHASE_START:
      return {
        ...state,
        loading: true,
        errors: false,
      };
    case actionTypes.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: false,
        purchaseData: {
          address: "",
          phone: "",
        },
      };
    case actionTypes.PURCHASE_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };

    //Purchase change handler
    case actionTypes.PURCHASE_CHANGE_HANDLER:
      const updatedPurchaseData = { ...state.purchaseData };
      Object.keys(updatedPurchaseData).forEach((item) => {
        if (item === action.event.target.name) {
          updatedPurchaseData[item] = action.event.target.value;
        }
      });
      return {
        ...state,
        purchaseData: { ...updatedPurchaseData },
      };

    //Get user orders
    case actionTypes.GET_USER_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.orders,
      };
    case actionTypes.GET_USER_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
