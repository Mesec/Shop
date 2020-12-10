import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import * as authActions from "../../../store/actions/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "../../../components/Spinner/Spinner";

const Login = (props) => {
  let errorsObject = {};
  if (props.errors) {
    props.errors.forEach((error) => {
      errorsObject[error.param] = error.msg;
    });
  } else {
    errorsObject = {};
  }
  const form = (
    <Form className={classes.Form}>
      <div className={classes.Header}>
        <p>Login</p>
      </div>
      <Form.Group className={classes.FormGroup} controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          size="sm"
          value={props.userData.email}
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
          placeholder="Password"
          name="password"
          size="sm"
          value={props.userData.password}
          onChange={(event) => props.onChangeHandler(event)}
        />
        <p className={classes.Error}>
          {errorsObject.password ? errorsObject.password : ""}
        </p>
      </Form.Group>
      <Button
        variant="info"
        type="submit"
        className={classes.Button}
        onClick={(event) =>
          props.loginUserHandler({
            userData: props.userData,
            history: props.history,
            event: event,
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
    userData: state.auth.loginData,
    errors: state.auth.errors,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserHandler: (data) => dispatch(authActions.loginUser(data)),
    onChangeHandler: (event) => dispatch(authActions.loginChangeHandler(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
