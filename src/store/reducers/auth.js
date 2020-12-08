import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  registerData: {
    fullName: "",
    email: "",
    password: "",
    password2: "",
  },
  loginData: {
    email: "",
    password: "",
  },
  errors: false,
  loading: false,
  isAuthenticated: false,
  isUserRegistered: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Register controls
    case actionTypes.REGISTER_CHANGE_HANDLER:
      const regDataCopy = { ...state.registerData };
      Object.keys(regDataCopy).forEach((item) => {
        if (item === action.event.target.name) {
          regDataCopy[item] = action.event.target.value;
        }
      });
      return {
        ...state,
        registerData: { ...regDataCopy },
      };
    case actionTypes.REGISTER_USER_START:
      return {
        ...state,
        errors: false,
        loading: true,
      };
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        errors: false,
        loading: false,
        isUserRegistered: true,
        registerData: {
          fullName: "",
          email: "",
          password: "",
          password2: "",
        },
      };
    case actionTypes.REGISTER_USER_FAILED:
      return {
        ...state,
        errors: action.errors,
        loading: false,
        isUserRegistered: true,
      };
    case actionTypes.DISABLE_ERRORS:
      return {
        ...state,
        errors: false,
      };
    //Login controls
    case actionTypes.LOGIN_CHANGE_HANDLER:
      const loginDataCopy = { ...state.loginData };
      Object.keys(loginDataCopy).forEach((item) => {
        if (item === action.event.target.name) {
          loginDataCopy[item] = action.event.target.value;
        }
      });
      return {
        ...state,
        loginData: { ...loginDataCopy },
      };
    case actionTypes.LOGIN_USER_START:
      return {
        ...state,
        loading: true,
        errors: false,
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: false,
        loginData: {
          email: "",
          password: "",
        },
        isAuthenticated: true,
      };
    case actionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    //Logout
    case actionTypes.LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
