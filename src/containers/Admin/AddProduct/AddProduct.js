import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as prodActions from "../../../store/actions/products";
import * as authActions from "../../../store/actions/auth";
import { withRouter } from "react-router-dom";
import classes from "./AddProduct.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "../../../components/Spinner/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddProduct = (props) => {
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
        <p>Add Product</p>
      </div>
      <Form.Row>
        <Form.Group as={Col} className={classes.FormGroup}>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Product Name"
            value={props.productData.name}
            size="sm"
            onChange={(event) => {
              props.onChangeHandler(event);
            }}
          />
          <p className={classes.Error}>
            {errorsObject.name ? errorsObject.name : ""}
          </p>
        </Form.Group>
        <Form.Group as={Col} className={classes.FormGroup}>
          <Form.Label>Product Type</Form.Label>
          <Form.Control
            name="type"
            type="text"
            placeholder="Product Type"
            value={props.productData.type}
            size="sm"
            onChange={(event) => {
              props.onChangeHandler(event);
            }}
          />
          <p className={classes.Error}>
            {errorsObject.type ? errorsObject.type : ""}
          </p>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} className={classes.FormGroup}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Price"
            value={props.productData.price}
            size="sm"
            onChange={(event) => {
              props.onChangeHandler(event);
            }}
          />
          <p className={classes.Error}>
            {errorsObject.price ? errorsObject.price : ""}
          </p>
        </Form.Group>
        <Form.Group as={Col} className={classes.FormGroup}>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            placeholder="Amount"
            value={props.productData.amount}
            size="sm"
            onChange={(event) => {
              props.onChangeHandler(event);
            }}
          />
          <p className={classes.Error}>
            {errorsObject.amount ? errorsObject.amount : ""}
          </p>
        </Form.Group>
      </Form.Row>
      <Form.Group className={classes.FormGroup}>
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          name="image"
          type="text"
          placeholder="Product Image"
          value={props.productData.image}
          size="sm"
          onChange={(event) => {
            props.onChangeHandler(event);
          }}
        />
        <p className={classes.Error}>
          {errorsObject.image ? errorsObject.image : ""}
        </p>
      </Form.Group>
      <Form.Group className={classes.FormGroup}>
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={2}
          placeholder="Description"
          size="sm"
          value={props.productData.description}
          onChange={(event) => {
            props.onChangeHandler(event);
          }}
        />
        <p className={classes.Error}>
          {errorsObject.description ? errorsObject.description : ""}
        </p>
      </Form.Group>
      <Button
        className={classes.Button}
        variant="info"
        type="submit"
        onClick={() =>
          props.addProductHandler({
            productData: props.productData,
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
      <Row>
        <Col xs>{props.loading ? <Spinner /> : form}</Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.productData,
    loading: state.products.loading,
    errors: state.products.errors,
    isProductAdded: state.products.isProductAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductHandler: (productData) =>
      dispatch(prodActions.addProduct(productData)),
    disableErrors: () => dispatch(authActions.disableErrors()),
    onChangeHandler: (event) =>
      dispatch(prodActions.addProductChangeHandler(event)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProduct));
