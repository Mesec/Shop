import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  products: null,
  previousProducts: null,
  productTypes: null,
  appliedFilters: [],
  singleProduct: null,
  errors: false,
  loading: false,
  isEditModalShown: false,
  isDeleteModalShown: false,
  productToUpdate: null,
  productToDelete: null,
  isSideDrawerShown: false,
  updateProductData: {
    name: "",
    type: "",
    image: "",
    amount: "",
    price: "",
    description: "",
  },
  priceCheckboxes: [
    { description: "0 - $100", checked: false, min: 0, max: 100, id: 0 },
    { description: "$100 - $200", checked: false, min: 100, max: 200, id: 1 },
    { description: "$200 - $300", checked: false, min: 200, max: 300, id: 2 },
    { description: "$300 - $500", checked: false, min: 300, max: 500, id: 3 },
    {
      description: "$500+",
      checked: false,
      min: 500,
      max: 2000,
      id: 4,
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Get products
    case actionTypes.GET_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      //Storing type of filtered action
      let appliedFilters = state.appliedFilters;
      const uncheckPriceCheckboxes = [...state.priceCheckboxes];
      uncheckPriceCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      if (action.productsType) {
        let index = state.appliedFilters.indexOf(action.productsType);
        if (index === -1) {
          appliedFilters = [];
          appliedFilters.push(action.productsType);
        }
      } else {
        appliedFilters = [];
      }
      return {
        ...state,
        products: action.products,
        productTypes: action.filteredTypes,
        loading: false,
        errors: false,
        singleProduct: null,
        appliedFilters: appliedFilters,
        priceCheckboxes: uncheckPriceCheckboxes,
      };

    //Get single product
    case actionTypes.GET_SINGLE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        singleProduct: action.product,
      };
    case actionTypes.GET_SINGLE_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };

    //Add product
    case actionTypes.ADD_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProductData: {
          name: "",
          type: "",
          image: "",
          amount: "",
          price: "",
          description: "",
          errors: false,
        },
      };
    case actionTypes.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        updateProductData: action.oldData,
      };
    case actionTypes.ADD_PRODUCT_CHANGE_HANDLER:
      const updatedProductData = { ...state.updateProductData };
      Object.keys(updatedProductData).forEach((item) => {
        if (action.event.target.name === item) {
          updatedProductData[item] = action.event.target.value;
        }
      });
      return {
        ...state,
        updateProductData: updatedProductData,
      };

    //Update product
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

    //Update product (modal controls)
    case actionTypes.SHOW_UPDATE_PRODUCT_MODAL:
      return {
        ...state,
        isEditModalShown: true,
        productToUpdate: action.productToUpdate,
      };
    case actionTypes.HIDE_UPDATE_PRODUCT_MODAL:
      return {
        ...state,
        isEditModalShown: false,
        errors: false,
      };

    //Delete product
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
    //Delete product (modal controls)
    case actionTypes.SHOW_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        isDeleteModalShown: true,
        productToDelete: action.product,
      };
    case actionTypes.HIDE_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        isDeleteModalShown: false,
      };
    //Side drawer controls (show-hide)
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

    //Filtering
    case actionTypes.FILTER_BY_PRICE_START:
      const updatedPriceCheckboxes = [...state.priceCheckboxes];
      updatedPriceCheckboxes.forEach((checkbox) => {
        if (checkbox.id === action.id) {
          checkbox.checked = !checkbox.checked;
        } else {
          checkbox.checked = false;
        }
      });
      return {
        ...state,
        priceCheckboxes: updatedPriceCheckboxes,
      };
    case actionTypes.FILTER_BY_PRICE_SUCCESS:
      let filtered_products = [];

      const nonChecked = state.priceCheckboxes.every(
        (checkbox) => checkbox.checked === false
      );

      if (nonChecked) {
        if (state.appliedFilters.length > 0) {
          filtered_products = action.products.filter((product) => {
            return product.type === state.appliedFilters[0];
          });
        } else {
          filtered_products = action.products;
        }
      }
      if (!nonChecked) {
        if (state.appliedFilters.length > 0) {
          let filteredByType = action.products.filter((product) => {
            return product.type === state.appliedFilters[0];
          });
          filtered_products = filteredByType.filter((product) => {
            return product.price >= action.min && product.price <= action.max;
          });
        } else {
          filtered_products = action.products.filter((product) => {
            return product.price >= action.min && product.price <= action.max;
          });
        }
      }
      return {
        ...state,
        products: filtered_products,
      };
    default:
      return state;
  }
};

export default reducer;
