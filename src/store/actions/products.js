import * as actionTypes from "./actionsTypes";
import axios from "axios";

//    GET PRODUCTS FROM DATABASE
export const getProductsStart = () => {
  return {
    type: actionTypes.GET_PRODUCTS_START,
  };
};
export const getProductsSuccess = (products, filteredTypes) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    products: products,
    filteredTypes: filteredTypes,
  };
};
export const getProductsFailed = () => {
  return {
    type: actionTypes.GETTING_PRODUCTS_FAILED,
  };
};

export const getProducts = (type) => {
  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .post("http://localhost:5000/products/get-products", {
        Authorization: "Bearer " + localStorage.getItem("token"),
        type: type,
      })
      .then((products) => {
        dispatch(
          getProductsSuccess(
            products.data.products,
            products.data.filteredTypes
          )
        );
        dispatch(hideSideDrawer());
      })
      .catch((err) => {
        dispatch(getProductsFailed());
      });
  };
};

//GET PRODUCTS FILTERED BY TYPE
export const getFilteredProducts = () => {};

// GET SINGLE PRODUCT FROM DB
export const getSingleProductStart = () => {
  return {
    type: actionTypes.GET_SINGLE_PRODUCT_START,
  };
};
export const getSingleProductSuccess = (product) => {
  return {
    type: actionTypes.GET_SINGLE_PRODUCT_SUCCESS,
    product: product,
  };
};
export const getSingleProductFailed = () => {
  return {
    type: actionTypes.GET_SINGLE_PRODUCT_FAILED,
  };
};
export const getSingleProduct = (productId) => {
  return (dispatch) => {
    dispatch(getSingleProductStart());
    axios
      .post("http://localhost:5000/products/get-product", {
        productId: productId,
      })
      .then((res) => {
        dispatch(getSingleProductSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getSingleProductFailed());
      });
  };
};

//    ADD PRODUCT TO DB
export const addProductStart = () => {
  return {
    type: actionTypes.ADD_PRODUCT_START,
  };
};
export const addProductSuccess = (response) => {
  return {
    type: actionTypes.ADD_PRODUCT_SUCCESS,
    response: response,
    errors: false,
  };
};
export const addProductFailed = (errors, oldData) => {
  return {
    type: actionTypes.ADD_PRODUCT_FAILED,
    errors: errors,
    oldData: oldData,
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    dispatch(addProductStart());
    axios
      .post("http://localhost:5000/products/add-product", data.productData)
      .then((response) => {
        dispatch(addProductSuccess());
        dispatch(getProducts());
        data.history.push("/admin/products");
      })
      .catch((err) => {
        dispatch(
          addProductFailed(
            err.response.data.errors.errors,
            err.response.data.oldData
          )
        );
      });
  };
};
export const addProductChangeHandler = (event) => {
  return {
    type: actionTypes.ADD_PRODUCT_CHANGE_HANDLER,
    event: event,
  };
};
//    EDIT PRODUCT
export const productChangeHandler = (event) => {
  //On Change Handler
  return {
    type: actionTypes.UPDATE_CHANGE_HANDLER,
    event: event,
  };
};
export const updateProductStart = () => {
  return {
    type: actionTypes.UPDATE_PRODUCT_START,
  };
};
export const updateProductSuccess = () => {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  };
};
export const updateProductFailed = (errors) => {
  return {
    type: actionTypes.UPDATE_PRODUCT_FAILED,
    errors: errors,
  };
};
export const updateProduct = (product) => {
  return (dispatch) => {
    dispatch(updateProductStart());
    axios
      .post("http://localhost:5000/products/update-product", product)
      .then((result) => {
        dispatch(updateProductSuccess());
        dispatch(updProdHideModal());
        dispatch(getProducts());
      })
      .catch((err) => {
        dispatch(updateProductFailed(err.response.data.errors.errors));
      });
  };
};

// UPDATE PRODUCT -MODAL ACTIONS
export const updProdShowModal = (productToUpdate) => {
  return {
    type: actionTypes.SHOW_UPDATE_PRODUCT_MODAL,
    productToUpdate: productToUpdate,
  };
};
export const updProdHideModal = () => {
  return {
    type: actionTypes.HIDE_UPDATE_PRODUCT_MODAL,
  };
};

// DELETE PRODUCT
export const deleteProductStart = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_START,
  };
};
export const deleteProductSuccess = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
  };
};
export const deleteProductFailed = () => {
  return {
    type: actionTypes.DELETE_PRODUCT_FAILED,
  };
};
export const deleteProduct = (product) => {
  return (dispatch) => {
    dispatch(deleteProductStart());
    axios
      .post("http://localhost:5000/products/delete-product", product)
      .then((result) => {
        dispatch(deleteProductSuccess());
        dispatch(getProducts());
        dispatch(delProdHideModal());
      })
      .catch((err) => {
        dispatch(deleteProductFailed());
      });
  };
};

// DELETE PRODUCT -MODAL ACTIONS
export const delProdShowModal = (product) => {
  return {
    type: actionTypes.SHOW_DELETE_PRODUCT_MODAL,
    product: product,
  };
};
export const delProdHideModal = () => {
  return {
    type: actionTypes.HIDE_DELETE_PRODUCT_MODAL,
  };
};

//Disable errors
export const disableErrors = () => {
  return {
    type: actionTypes.DISABLE_ERRORS,
  };
};

//Side drawer actions
export const showSideDrawer = () => {
  return {
    type: actionTypes.SHOW_SIDE_DRAWER,
  };
};
export const hideSideDrawer = () => {
  return {
    type: actionTypes.HIDE_SIDE_DRAWER,
  };
};
