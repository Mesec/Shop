import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  products: null,
  filteredProducts: null,
  filteredByPrice: null,
  productTypes: null,
  productBrands: null,
  product: null,
  errors: false,
  loading: false,
  editPrModal: false,
  deletePrModal: false,
  productToUpdate: null,
  productToDelete: null,
  isProductAdded: false,
  showSideDrawer: false,
  brandCheckboxes: null,
  filterControls: {
    min: 0,
    max: 2000,
  },
  priceCheckboxes: [
    { name: "All Products", checked: true, min: 0, max: 5000, id: 0 },
    { name: "0-$50", checked: false, min: 0, max: 50, id: 1 },
    { name: "$50 - $100", checked: false, min: 50, max: 100, id: 2 },
    { name: "$100 - $200", checked: false, min: 100, max: 200, id: 3 },
    { name: "$200 and higher", checked: false, min: 200, max: 5000, id: 4 },
  ],
  productData: {
    name: "",
    type: "",
    image: "",
    amount: "",
    price: "",
    description: "",
  },
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
      let brands = [];
      action.products.forEach((prod) => {
        brands.push(prod.brand);
      });
      let filteredBrands = brands.filter((brand, index) => {
        return brands.indexOf(brand) === index;
      });
      let brandCheckboxes = [];
      filteredBrands.forEach((brand, index) => {
        brandCheckboxes.push({ name: brand, checked: false, id: index });
      });
      return {
        ...state,
        products: action.products,
        filteredProducts: action.products,
        loading: false,
        errors: false,
        product: null,
        productTypes: action.filteredTypes,
        brandCheckboxes: brandCheckboxes,
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
        showSideDrawer: true,
      };
    case actionTypes.HIDE_SIDE_DRAWER:
      return {
        ...state,
        showSideDrawer: false,
      };
    //Filtering products reducers
    case actionTypes.SEARCH_FOR_PRODUCT:
      const products = state.products;

      const filteredProducts = products.filter((item) => {
        return item.name
          .toUpperCase()
          .includes(action.event.target.value.toUpperCase(), 0);
      });
      const price_checkboxes = state.priceCheckboxes.forEach(
        (checkbox) => (checkbox.checked = false)
      );
      let brand__checkboxes;
      if (state.brandCheckboxes) {
        brand__checkboxes = state.brandCheckboxes.forEach(
          (checkbox) => (checkbox.checked = false)
        );
      }
      return {
        ...state,
        filteredProducts: filteredProducts,
        priceCheckbox: price_checkboxes,
        brandCheckboxes: brand__checkboxes,
      };
    case actionTypes.FILTER_BY_PRICE_START:
      const checkBoxes = [...state.priceCheckboxes];
      if (!checkBoxes[action.id].checked) {
        checkBoxes.forEach((item, index) =>
          index !== action.id
            ? (checkBoxes[index].checked = false)
            : (checkBoxes[index].checked = true)
        );
      } else {
        return { ...state };
      }
      return {
        ...state,
        loading: true,
        priceCheckboxes: checkBoxes,
      };
    case actionTypes.FILTER_BY_PRICE_SUCCESS:
      let filteredProds;
      const brand_Checkboxes = [];
      let { filterControls } = state;
      const checkboxes = [...state.priceCheckboxes];
      if (checkboxes[action.id].checked) {
        filteredProds = action.products;

        //extracting brands
        const prodBrands = [];
        filteredProds.forEach((prod) => prodBrands.push(prod.brand));

        //deleting duplicates from prodBrands array
        const filtered_brands = prodBrands.filter((item, index) => {
          return prodBrands.indexOf(item) === index;
        });
        //making brand_checkboxes object
        filtered_brands.forEach((brand, index) => {
          brand_Checkboxes.push({ name: brand, checked: false, id: index });
        });
        //setting filter controls -min and max price
        filterControls.min = action.min;
        filterControls.max = action.max;
      } else {
        const prodBrands = [];
        state.products.forEach((prod) => prodBrands.push(prod.brand));
        const filtered_brands = prodBrands.filter((item, index) => {
          return prodBrands.indexOf(item) === index;
        });
        filtered_brands.forEach((brand, index) => {
          brand_Checkboxes.push({ name: brand, checked: false, id: index });
        });
        filterControls.min = action.min;
        filterControls.max = action.max;
        filteredProds = state.products;
      }
      return {
        ...state,
        filteredProducts: filteredProds,
        filterControls: filterControls,
        brandCheckboxes: brand_Checkboxes,
        loading: false,
      };
    case actionTypes.FILTER_BY_PRICE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FILTER_BY_BRAND_START:
      const brand_checkboxes = [...state.brandCheckboxes];
      if (!brand_checkboxes[action.id].checked) {
        brand_checkboxes.forEach((item) => {
          item.id !== action.id
            ? (item.checked = false)
            : (item.checked = true);
        });
      } else {
        brand_checkboxes[action.id].checked = false;
      }
      return {
        ...state,
        brandCheckboxes: brand_checkboxes,
      };

    case actionTypes.FILTER_BY_BRAND_SUCCESS:
      let filtered_products;

      if (state.brandCheckboxes[action.id].checked) {
        filtered_products = action.products.filter((product) => {
          return product.brand === action.brand;
        });
      }
      let checkedValidation = state.brandCheckboxes.every(
        (checkbox) => checkbox.checked === false
      );
      if (checkedValidation) {
        console.log(action.products);
        filtered_products = [...action.products];
      }

      return {
        ...state,
        filteredProducts: filtered_products,
      };
    default:
      return state;
  }
};

export default reducer;
