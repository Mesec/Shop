import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as authActions from "../../../store/actions/auth.js";
import * as prodAction from "../../../store/actions/products.js";
import classes from "./Register.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "../../../components/Spinner/Spinner";

const Login = (props) => {
  useEffect(() => {
    props.disableErrors();
  }, []);

  let errorsObject = {};
  if (props.errors) {
    props.errors.forEach((error) => {
      errorsObject[error.param] = error.msg;
    });
  } else {
    errorsObject = {};
  }
  let form = (
    <Form className={classes.Form}>
      <div className={classes.Header}>
        <p>Register</p>
      </div>
      <Form.Group className={classes.FormGroup}>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={props.userData.fullName}
          size="sm"
          onChange={(event) => props.onChangeHandler(event)}
        />
        <p className={classes.Error}>
          {errorsObject.fullName ? errorsObject.fullName : ""}
        </p>
      </Form.Group>
      <Form.Group className={classes.FormGroup} controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={props.userData.email}
          size="sm"
          onChange={(event) => props.onChangeHandler(event)}
        />
        <p className={classes.Error}>
          {errorsObject.email ? errorsObject.email : ""}
        </p>
      </Form.Group>
      <Form.Group className={classes.FormGroup} controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={props.userData.password}
          size="sm"
          onChange={(event) => props.onChangeHandler(event)}
        />
        <p className={classes.Error}>
          {errorsObject.password ? errorsObject.password : ""}
        </p>
      </Form.Group>
      <Form.Group className={classes.FormGroup} controlId="formBasicPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={props.userData.password2}
          size="sm"
          onChange={(event) => props.onChangeHandler(event)}
        />
        <p className={classes.Error}>
          {errorsObject.password2 ? errorsObject.password2 : ""}
        </p>
      </Form.Group>
      <Button
        className={classes.Button}
        variant="primary"
        type="submit"
        onClick={() =>
          props.registerUserHandler({
            userData: props.userData,
            history: props.history,
          })
        }
      >
        Submit
      </Button>
    </Form>
  );
  return (
    <Container className={classes.Container}>
      {props.loading ? <Spinner /> : form}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.registerData,
    errors: state.auth.errors,
    loading: state.auth.loading,
    isUserRegistered: state.auth.isUserRegistered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeHandler: (event) => dispatch(authActions.regChangeHandler(event)),
    registerUserHandler: (userData) =>
      dispatch(authActions.registerUser(userData)),
    disableErrors: () => dispatch(prodAction.disableErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
