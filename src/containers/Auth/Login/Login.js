import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import * as authActions from "../../../store/actions/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "../../../components/Spinner/Spinner";

class Login extends Component {
  render() {
    console.log(this.props.history);
    let errorsObject = {};
    if (this.props.errors) {
      this.props.errors.forEach((error) => {
        errorsObject[error.param] = error.msg;
      });
    } else {
      errorsObject = {};
    }
    const form = (
      <Form className={classes.Form}>
        <div className={classes.Header}>
          <h3>Login</h3>
        </div>
        <Form.Group className={classes.FormGroup} controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            size="sm"
            value={this.props.userData.email}
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
            placeholder="Password"
            name="password"
            size="sm"
            value={this.props.userData.password}
            onChange={(event) => this.props.onChangeHandler(event)}
          />
          <p className={classes.Error}>
            {errorsObject.password ? errorsObject.password : ""}
          </p>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={classes.Button}
          onClick={(event) =>
            this.props.loginUserHandler({
              userData: this.props.userData,
              history: this.props.history,
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
                <Spinner />{" "}
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
