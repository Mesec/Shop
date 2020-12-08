import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../../store/actions/cart";
import classes from "./Cart.module.css";
import { withRouter } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import TableBody from "../../../components/CartTableBody/CartTableBody";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "../../../components/Spinner/Spinner";
import Modal from "../../../components/Modal/OrderModal";

const Cart = (props) => {
  useEffect(() => {
    props.getCartProducts();
  }, []);

  let cart;

  if (props.products.length > 0 && !props.loading) {
    cart = (
      <Row>
        <div className={classes.Controls}>
          <Button onClick={props.getCartProducts}>Refresh</Button>
          <Button onClick={() => props.history.push("/")}>Back to Shop</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Vat</th>
            </tr>
          </thead>
          <TableBody />
        </Table>
        <Card className={classes.Cart}>
          <Card.Body className={classes.CartBody}>
            <Col className={classes.Price}>
              <p>Total:</p>
              <p>${props.total}</p>
            </Col>
            <Col
              className={classes.Price}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>Vat:</p>
              <p>${props.pdv.toFixed(2)}</p>
            </Col>
            <hr />
            <Col className={classes.TotalPrice}>
              <h6>All Together</h6>
              <h6>$ {props.totalPrice.toFixed(2)}</h6>
            </Col>
            <Col className={classes.PurchaseActions}>
              <Button
                onClick={props.showModalHandler}
                variant="primary"
                size="sm"
              >
                Order
              </Button>
              <Button onClick={props.clearCart} variant="danger" size="sm">
                Delete
              </Button>
            </Col>
          </Card.Body>
        </Card>
      </Row>
    );
  }
  if (props.products.length === 0 && !props.loading) {
    cart = (
      <div className={classes.Empty}>
        <h3>The Cart is Empty</h3>
      </div>
    );
  }
  if (props.loading) {
    cart = <Spinner />;
  }
  return (
    <Container className={classes.Container}>
      {cart}
      <Modal />
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.cart.cartProducts,
    loading: state.cart.loading,
    total: state.cart.total,
    pdv: state.cart.pdv,
    totalPrice: state.cart.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCartProducts: () => dispatch(cartActions.getCartProducts()),
    clearCart: () => dispatch(cartActions.clearCart()),
    showModalHandler: () => dispatch(cartActions.showPurchaseModal()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
