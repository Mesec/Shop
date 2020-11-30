import React from "react";
import { connect } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "../Spinner/Spinner";

const orderModal = (props) => {
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
      {props.loading ? (
        <div
          style={{
            minHeight: "140px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div>
          <Modal.Header closeButton style={{ marginBottom: "20px" }}>
            <Modal.Title>Order Now</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form type="submit">
              <Form.Group>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Address"
                  size="sm"
                  onChange={(event) => props.onChangeHandler(event)}
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
                  {errorsObject.address ? errorsObject.address : ""}
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  size="sm"
                  onChange={(event) => props.onChangeHandler(event)}
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
                  {errorsObject.phone ? errorsObject.phone : ""}
                </p>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer style={{ position: "relative", bottom: "10px" }}>
            <Button
              onClick={() =>
                props.purchaseHandler(
                  props.purchaseData,
                  props.cartData,
                  props.totalPrice
                )
              }
              variant="primary"
            >
              Purchase
            </Button>
            <Button onClick={props.hideModalHandler} variant="primary">
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalShown: state.cart.isModalShown,
    purchaseData: state.order.purchaseData,
    cartData: state.cart.cartProducts,
    totalPrice: state.cart.totalPrice,
    loading: state.order.loading,
    errors: state.order.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModalHandler: () => dispatch(cartActions.hidePurchaseModal()),
    purchaseHandler: (purchaseData, cartData, totalPrice) =>
      dispatch(orderActions.purchase(purchaseData, cartData, totalPrice)),
    onChangeHandler: (event) =>
      dispatch(orderActions.purchaseChangeHandler(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderModal);
