import React from "react";
import { connect } from "react-redux";
import * as prodActions from "../../store/actions/products";
import * as authActions from "../../store/actions/auth";
import { withRouter } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from "../Spinner/Spinner";
import classes from "./AddProductModal.module.css";

const modal = (props) => {
  let errorsObject = {};
  if (props.errors) {
    props.errors.forEach((error) => {
      errorsObject[error.param] = error.msg;
    });
  } else {
    errorsObject = {};
  }
  return (
    <Modal show={props.isModalShown} onHide={props.hideModalHandler}>
      <Modal.Header>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className={classes.Form}>
          <Form.Row>
            <Form.Group as={Col} className={classes.FormGroup}>
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
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
              <Form.Control
                name="type"
                type="text"
                placeholder="Type"
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
          <Form.Row>
            <Form.Group className={classes.FormGroup} as={Col}>
              <Form.Control
                name="image"
                type="text"
                placeholder="Image"
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
            <Form.Group className={classes.FormGroup} as={Col}>
              <Form.Control
                name="brand"
                type="text"
                placeholder="Brand"
                value={props.productData.brand}
                size="sm"
                onChange={(event) => {
                  props.onChangeHandler(event);
                }}
              />
              <p className={classes.Error}>
                {errorsObject.brand ? errorsObject.brand : ""}
              </p>
            </Form.Group>
          </Form.Row>

          <Form.Group className={classes.FormGroup}>
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
          <Form.Group className={classes.ButtonContainer}>
            <Button onClick={props.hideModalHandler} variant="secondary">
              Cancel
            </Button>
            <Button
              className={classes.Button}
              variant="primary"
              type="submit"
              onClick={(event) =>
                props.addProductHandler({
                  productData: props.productData,
                  event: event,
                })
              }
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.products.updateProductData,
    loading: state.products.loading,
    errors: state.products.errors,
    isModalShown: state.products.isAddProductModalShown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductHandler: (productData, event) =>
      dispatch(prodActions.addProduct(productData, event)),
    disableErrors: () => dispatch(authActions.disableErrors()),
    onChangeHandler: (event) =>
      dispatch(prodActions.addProductChangeHandler(event)),
    hideModalHandler: () => dispatch(prodActions.hideAddProductModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modal);
