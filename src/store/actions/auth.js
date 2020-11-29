import * as actionTypes from "./actionsTypes";
import axios from "axios";

//  Register Actions
export const regChangeHandler = event => {
  return {
    type: actionTypes.REGISTER_CHANGE_HANDLER,
    event: event,
  };
};
export const registerUserStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START,
  };
};
export const registerUserSuccess = response => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    response: response,
  };
};
export const registerUserFailed = errors => {
  return {
    type: actionTypes.REGISTER_USER_FAILED,
    errors: errors,
  };
};
export const registerUser = userData => {
  return dispatch => {
    dispatch(registerUserStart());
    axios
      .post("http://localhost:5000/auth/register", userData)
      .then(response => {
        dispatch(registerUserSuccess(response));
      })
      .catch(error => {
        dispatch(registerUserFailed(error.response.data.errors.errors));
      });
  };
};
//Login actions
export const loginChangeHandler = event => {
  return {
    type: actionTypes.LOGIN_CHANGE_HANDLER,
    event: event,
  };
};
export const loginUserStart = () => {
  return {
    type: actionTypes.LOGIN_USER_START,
  };
};
export const loginUserSuccess = () => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
  };
};
export const loginUserFailed = errors => {
  return {
    type: actionTypes.LOGIN_USER_FAILED,
    errors: errors,
  };
};
export const loginUser = userData => {
  console.log(userData);
  return dispatch => {
    dispatch(loginUserStart());
    axios
      .post("http://localhost:5000/auth/login", userData)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch(loginUserSuccess());
      })
      .catch(error => {
        dispatch(loginUserFailed(error.response.data.errors.errors));
      });
  };
};

//Logout
export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

//Errors
export const disableErrors = () => {
  return {
    type: actionTypes.DISABLE_ERRORS,
  };
};
