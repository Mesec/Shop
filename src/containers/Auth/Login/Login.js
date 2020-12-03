import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Login.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "../../../components/Spinner/Spinner";

class Login extends Component {
  state = {
    userData: {
      email: "",
      password: "",
    },
  };
  onChangeHandler(event) {
    event.preventDefault();
    const userDataCopy = { ...this.state.userData };
    Object.keys(userDataCopy).forEach((item) => {
      if (event.target.name === item) {
        userDataCopy[item] = event.target.value;
      }
    });
    this.setState({ userData: userDataCopy });
  }
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
            onChange={(event) => this.onChangeHandler(event)}
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
            onChange={(event) => this.onChangeHandler(event)}
          />
          <p className={classes.Error}>
            {errorsObject.password ? errorsObject.password : ""}
          </p>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={classes.Button}
          onClick={() =>
            this.props.loginHandler(
              this.state.userData,
              this.props.history.action
            )
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

export default connect()(withRouter(Login));
