import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
      <Form.Group style={{ width: "100%" }}>
        <h3>Login</h3>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(event) => this.onChangeHandler(event)}
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
            placeholder="Password"
            name="password"
            onChange={(event) => this.onChangeHandler(event)}
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
        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: "10px" }}
          onClick={() =>
            this.props.loginHandler(
              this.state.userData,
              this.props.history.action
            )
          }
        >
          Submit
        </Button>
      </Form.Group>
    );
    return (
      <Container style={{ padding: "50px 0 20px 0" }}>
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

export default withRouter(Login);
