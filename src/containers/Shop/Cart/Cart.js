import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../../store/actions/cart";
import classes from "./Cart.module.css";
import { withRouter } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "../../../components/Spinner/Spinner";
import Modal from "../../../components/Modal/OrderModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
  useEffect(() => {
    props.getCartProducts();
  }, []);
  console.log(props.products);
  let cart = <Spinner />;
  if (props.products.length > 0) {
    cart = (
      <Row className={classes.Row}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Vat</th>
            </tr>
          </thead>
          <tbody>
            {props.products.map((product) => {
              return (
                <tr>
                  <td className={classes.FirstTd}>
                    <img
                      src={product.productId.image}
                      alt={product.productId.name}
                      className={classes.ProductImage}
                    />
                    {product.productId.name}
                  </td>
                  <td>
                    <span>{product.quantity}</span>
                  </td>
                  <td>
                    <span>${product.productId.price.toFixed(2)}</span>
                  </td>
                  <td className={classes.LastTd}>
                    <span>${(product.productId.price * 0.2).toFixed(2)} </span>
                    <span className={classes.IconContainer}>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className={classes.Icon}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Card className={classes.Card}>
          <Card.Body className={classes.CardBody}>
            <Row className={classes.CardRow}>
              <Col className={classes.CardCols}>
                <p>Total Vat:</p> <p>${props.vat}</p>
              </Col>
              <Col className={classes.CardCols}>
                <p>Total Price:</p> <p>${props.totalPrice}</p>
              </Col>
            </Row>
            <Row>
              <Col className={classes.PurchaseActions}>
                <Button
                  onClick={props.showModalHandler}
                  variant="info"
                  size="sm"
                >
                  Order
                </Button>
                <Button onClick={props.clearCart} variant="secondary" size="sm">
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    );
  }
  if (props.products.length === 0) {
    cart = (
      <div className={classes.EmptyCart}>
        <FontAwesomeIcon icon={faShoppingCart} className={classes.CartIcon} />
        <div>
          <h4>The Cart is Empty</h4>
          <p>There is no articles in your cart.</p>
          <p>
            Click <a href="/">here</a> to continue shopping.
          </p>
        </div>
      </div>
    );
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
    vat: state.cart.vat,
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
