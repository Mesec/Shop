import * as actionTypes from "./actionsTypes";
import axios from "axios";

//  Register Actions
export const regChangeHandler = (event) => {
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
export const registerUserSuccess = (response) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    response: response,
  };
};
export const registerUserFailed = (errors) => {
  return {
    type: actionTypes.REGISTER_USER_FAILED,
    errors: errors,
  };
};
export const registerUser = (data) => {
  return (dispatch) => {
    dispatch(registerUserStart());
    axios
      .post("http://localhost:5000/auth/register", data.userData)
      .then((response) => {
        dispatch(registerUserSuccess(response));
        data.history.push("/login");
      })
      .catch((error) => {
        dispatch(registerUserFailed(error.response.data.errors.errors));
      });
  };
};
//Login actions
export const loginChangeHandler = (event) => {
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
export const loginUserFailed = (errors) => {
  return {
    type: actionTypes.LOGIN_USER_FAILED,
    errors: errors,
  };
};
export const loginUser = (data) => {
  data.event.preventDefault();
  return (dispatch) => {
    dispatch(loginUserStart());
    axios
      .post("http://localhost:5000/auth/login", data.userData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        dispatch(loginUserSuccess());
        if (data.history.location.state) {
          data.history.push(data.history.location.state);
        } else {
          data.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
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
