import React from "react";
import { connect } from "react-redux";
import * as cartActions from "../../store/actions/cart";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const orderModal = (props) => {
  return (
    <Modal show={props.isModalShown} onHide={props.hideModalHandler}>
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone Number"
              size="sm"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer style={{ position: "relative", bottom: "10px" }}>
        <Button variant="primary">Purchase</Button>
        <Button onClick={props.hideModalHandler} variant="primary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalShown: state.cart.isModalShown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModalHandler: () => dispatch(cartActions.hidePurchaseModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orderModal);
