import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  products: null,
  product: null,
  productData: {
    name: "",
    type: "",
    image: "",
    amount: "",
    price: "",
    description: "",
  },
  errors: false,
  loading: false,
  editPrModal: false,
  deletePrModal: false,
  productToUpdate: null,
  productToDelete: null,
  isProductAdded: false,
  isSideDrawerShown: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //    ****GET PRODUCTS****
    case actionTypes.GET_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
        loading: false,
        errors: false,
        product: null,
      };
    //    ****GET SINGLE PRODUCT****
    case actionTypes.GET_SINGLE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.product,
      };
    case actionTypes.GET_SINGLE_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };

    //    ****ADD PRODUCT****
    case actionTypes.ADD_PRODUCT_START:
      return {
        ...state,
        loading: true,
        isProductAdded: false,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productData: {
          name: "",
          type: "",
          image: "",
          amount: "",
          price: "",
          description: "",
          errors: false,
        },
        isProductAdded: true,
      };
    case actionTypes.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        productData: action.oldData,
        isProductAdded: false,
      };
    case actionTypes.ADD_PRODUCT_CHANGE_HANDLER:
      const updatedProductData = { ...state.productData };
      Object.keys(updatedProductData).forEach((item) => {
        if (action.event.target.name === item) {
          updatedProductData[item] = action.event.target.value;
        }
      });
      return {
        ...state,
        productData: updatedProductData,
      };

    //    ****EDIT PRODUCT****
    case actionTypes.UPDATE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: false,
      };

    case actionTypes.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    case actionTypes.UPDATE_CHANGE_HANDLER:
      const productCopy = { ...state.productToUpdate };
      Object.keys(productCopy).forEach((item) => {
        if (action.event.target.name === item) {
          productCopy[item] = action.event.target.value;
        }
      });
      return {
        ...state,
        productToUpdate: { ...productCopy },
      };

    //    -Update product -modal controls
    case actionTypes.SHOW_UPDATE_PRODUCT_MODAL:
      return {
        ...state,
        editPrModal: true,
        productToUpdate: action.productToUpdate,
      };
    case actionTypes.HIDE_UPDATE_PRODUCT_MODAL:
      return {
        ...state,
        editPrModal: false,
        errors: false,
      };

    //   ****DELETE PRODUCT****
    case actionTypes.DELETE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DELETE_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    //    -Delete product -modal controls
    case actionTypes.SHOW_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        deletePrModal: true,
        productToDelete: action.product,
      };
    case actionTypes.HIDE_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        deletePrModal: false,
      };
    //Side drawer controls
    case actionTypes.SHOW_SIDE_DRAWER:
      return {
        ...state,
        isSideDrawerShown: true,
      };
    case actionTypes.HIDE_SIDE_DRAWER:
      return {
        ...state,
        isSideDrawerShown: false,
      };
    default:
      return state;
  }
};

export default reducer;
