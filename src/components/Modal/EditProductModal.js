import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "../Spinner/Spinner";

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
      <Modal.Header closeButton style={{ marginBottom: "20px" }}>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "400px" }}>
        {props.loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </div>
        ) : (
          <Form type="submit">
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                placeholder="Edit Name"
                value={props.product ? props.product.name : ""}
                onChange={(event) => props.onChangeHandler(event)}
                size="sm"
              />
              <p
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  height: " 15px",
                  paddingTop: "3px",
                  paddingLeft: "4px",
                }}
              >
                {errorsObject.name ? errorsObject.name : ""}
              </p>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="type"
                placeholder="Edit Type"
                value={props.product ? props.product.type : ""}
                onChange={(event) => props.onChangeHandler(event)}
                size="sm"
              />
              <p
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  height: " 15px",
                  paddingTop: "3px",
                  paddingLeft: "4px",
                }}
              >
                {errorsObject.type ? errorsObject.type : ""}
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="image"
                placeholder="Edit Image"
                value={props.product ? props.product.image : ""}
                onChange={(event) => props.onChangeHandler(event)}
                size="sm"
              />
              <p
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  height: " 15px",
                  paddingTop: "3px",
                  paddingLeft: "4px",
                }}
              >
                {errorsObject.image ? errorsObject.image : ""}
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="amount"
                placeholder="Edit Amount"
                value={props.product ? props.product.amount : ""}
                onChange={(event) => props.onChangeHandler(event)}
                size="sm"
              />
              <p
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  height: " 15px",
                  paddingTop: "3px",
                  paddingLeft: "4px",
                }}
              >
                {errorsObject.amount ? errorsObject.amount : ""}
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="price"
                placeholder="Edit Price"
                value={props.product ? props.product.price : ""}
                onChange={(event) => props.onChangeHandler(event)}
                size="sm"
              />
              <p
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  height: " 15px",
                  paddingTop: "3px",
                  paddingLeft: "4px",
                }}
              >
                {errorsObject.price ? errorsObject.price : ""}
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="description"
                as="textarea"
                rows={2}
                placeholder="Edit Description"
                value={props.product ? props.product.description : ""}
                onChange={(event) => props.onChangeHandler(event)}
                size="sm"
              />
              <p
                style={{
                  color: "red",
                  fontSize: "0.8em",
                  height: " 15px",
                  paddingTop: "3px",
                  paddingLeft: "4px",
                }}
              >
                {errorsObject.description ? errorsObject.description : ""}
              </p>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer style={{ position: "relative", bottom: "10px" }}>
        <Button variant="secondary" onClick={props.hideModalHandler}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => props.updateProductHandler(props.product)}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalShown: state.products.isEditModalShown,
    product: state.products.productToUpdate,
    errors: state.products.errors,
    loading: state.products.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductHandler: (product) => dispatch(actions.updateProduct(product)),
    hideModalHandler: () => dispatch(actions.updProdHideModal()),
    onChangeHandler: (event) => dispatch(actions.productChangeHandler(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modal);
