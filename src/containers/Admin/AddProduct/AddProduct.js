import React, { Component } from "react";
import { connect } from "react-redux";
import * as prodActions from "../../../store/actions/products";
import * as authActions from "../../../store/actions/auth";
import { withRouter } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "../../../components/Spinner/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AddProduct extends Component {
  componentDidMount() {
    this.props.disableErrors();
  }
  state = {
    productData: {
      name: "",
      type: "",
      image: "",
      amount: "",
      price: "",
      description: "",
    },
    errors: false,
  };

  componentDidMount() {
    const productData = this.props.oldProductData;
    this.setState({ productData: productData });
  }

  addProductHandler = event => {
    event.preventDefault();
    this.props.addProductHandler({ ...this.state.productData });
    // this.props.history.replace("/admin/products");
    const productData = this.props.oldProductData;
    this.setState({ productData: productData });
  };

  onChangeHandler = event => {
    const productDataCopy = { ...this.state.productData };
    Object.keys(productDataCopy).forEach(item => {
      if (item === event.target.name) {
        productDataCopy[item] = event.target.value;
      }
    });
    this.setState({ productData: productDataCopy });
  };
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
      <Form style={{ width: "100%" }}>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Product Name"
            value={this.state.productData.name}
            size="sm"
            onChange={event => {
              this.onChangeHandler(event);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.9em",
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            {errorsObject.name ? errorsObject.name : ""}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Type</Form.Label>
          <Form.Control
            name="type"
            type="text"
            placeholder="Product Type"
            value={this.state.productData.type}
            size="sm"
            onChange={event => {
              this.onChangeHandler(event);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.9em",
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            {errorsObject.type ? errorsObject.type : ""}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            name="image"
            type="text"
            placeholder="Product Image"
            value={this.state.productData.image}
            size="sm"
            onChange={event => {
              this.onChangeHandler(event);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.9em",
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            {errorsObject.image ? errorsObject.image : ""}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Amout</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            placeholder="Amount"
            value={this.state.productData.amount}
            size="sm"
            onChange={event => {
              this.onChangeHandler(event);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.9em",
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            {errorsObject.amount ? errorsObject.amount : ""}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Price"
            value={this.state.productData.price}
            size="sm"
            onChange={event => {
              this.onChangeHandler(event);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.9em",
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            {errorsObject.price ? errorsObject.price : ""}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={2}
            placeholder="Description"
            size="sm"
            value={this.state.productData.description}
            onChange={event => {
              this.onChangeHandler(event);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "0.9em",
              paddingTop: "5px",
              paddingLeft: "4px",
            }}
          >
            {errorsObject.description ? errorsObject.description : ""}
          </p>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={event => this.addProductHandler(event)}
        >
          Submit
        </Button>
      </Form>
    );
    return (
      <Container>
        <Row>
          <Col
            style={{
              margin: "50px auto 0 auto",
              paddingBottom: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            xs
          >
            {this.props.loading ? <Spinner /> : form}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    oldProductData: state.products.productData,
    loading: state.products.loading,
    errors: state.products.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProductHandler: productData =>
      dispatch(prodActions.addProduct(productData)),
    disableErrors: () => dispatch(authActions.disableErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProduct));
