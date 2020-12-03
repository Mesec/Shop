import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as authActions from "../../../store/actions/auth.js";
import * as prodAction from "../../../store/actions/products.js";
import classes from "./Register.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "../../../components/Spinner/Spinner";

class Login extends Component {
  componentDidMount() {
    this.props.disableErrors();
  }

  render() {
    let errorsObject = {};
    if (this.props.errors) {
      this.props.errors.forEach((error) => {
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
            value={this.props.userData.fullName}
            size="sm"
            onChange={(event) => this.props.onChangeHandler(event)}
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
            value={this.props.userData.email}
            size="sm"
            onChange={(event) => this.props.onChangeHandler(event)}
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
            value={this.props.userData.password}
            size="sm"
            onChange={(event) => this.props.onChangeHandler(event)}
          />
          <p className={classes.Error}>
            {errorsObject.password ? errorsObject.password : ""}
          </p>
        </Form.Group>
        <Form.Group
          className={classes.FormGroup}
          controlId="formBasicPassword2"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={this.props.userData.password2}
            size="sm"
            onChange={(event) => this.props.onChangeHandler(event)}
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
            this.props.registerUserHandler({
              userData: this.props.userData,
              history: this.props.history,
            })
          }
        >
          Submit
        </Button>
      </Form>
    );
    return (
      <Container className={classes.Container}>
        <Row>
          <Col>
            {this.props.loading ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              >
                <Spinner />
              </div>
            ) : (
              form
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

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
