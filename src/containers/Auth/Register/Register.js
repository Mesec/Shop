import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActions from "../../../store/actions/auth.js";
import * as prodAction from "../../../store/actions/products.js";

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
      this.props.errors.forEach(error => {
        errorsObject[error.param] = error.msg;
      });
    } else {
      errorsObject = {};
    }
    let form = (
      <Form.Group style={{ width: "100%" }}>
        <h3>Register</h3>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={event => this.props.onChangeHandler(event)}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.8em",
              paddingTop: "7px",
              paddingLeft: "10px",
              height: "15px",
            }}
          >
            {errorsObject.fullName ? errorsObject.fullName : ""}
          </p>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={event => this.props.onChangeHandler(event)}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.8em",
              paddingTop: "7px",
              paddingLeft: "10px",
              height: "15px",
            }}
          >
            {errorsObject.email ? errorsObject.email : ""}
          </p>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={event => this.props.onChangeHandler(event)}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.8em",
              paddingTop: "7px",
              paddingLeft: "10px",
              height: "15px",
            }}
          >
            {errorsObject.password ? errorsObject.password : ""}
          </p>
        </Form.Group>
        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={event => this.props.onChangeHandler(event)}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.8em",
              paddingTop: "7px",
              paddingLeft: "10px",
              height: "15px",
            }}
          >
            {errorsObject.password2 ? errorsObject.password2 : ""}
          </p>
        </Form.Group>
        <Button
          style={{ marginTop: "20px" }}
          variant="primary"
          type="submit"
          onClick={() => this.props.registerUserHandler(this.props.userData)}
        >
          Submit
        </Button>
      </Form.Group>
    );
    return (
      <Container
        style={{
          margin: "50px auto 0 auto",
        }}
      >
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

const mapStateToProps = state => {
  return {
    userData: state.auth.registerData,
    errors: state.auth.errors,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onChangeHandler: event => dispatch(authActions.regChangeHandler(event)),
    registerUserHandler: userData =>
      dispatch(authActions.registerUser(userData)),
    disableErrors: () => dispatch(prodAction.disableErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
