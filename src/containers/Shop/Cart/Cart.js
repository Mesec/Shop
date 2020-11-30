import React, { Component } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../../store/actions/cart";
import classes from "./Cart.module.css";
import { withRouter } from "react-router";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "../../../components/Spinner/Spinner";
import Modal from "../../../components/Modal/OrderModal";

class Cart extends Component {
  state = {
    isCartCleaned: true,
  };

  componentDidMount() {
    this.props.getCartProducts();
  }

  render() {
    let cart = <Spinner />;
    let total = 0;

    if (this.props.products.length > 0 && !this.props.loading) {
      cart = (
        <div>
          <div className={classes.Controls}>
            <button onClick={this.props.getCartProducts}>Refresh</button>
            <button onClick={() => this.props.history.push("/")}>
              Back to Shop
            </button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>
                      <div>
                        <img
                          style={{ width: "40px", marginRight: "10px" }}
                          src={product.productId.image}
                          alt=""
                        />{" "}
                        {product.productId.name}
                      </div>
                    </td>
                    <td>${product.productId.price}</td>
                    <td>{product.quantity}</td>
                    <td>${product.productId.price * product.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "0.9em" }}>Total:</p>
                <p style={{ fontSize: "0.9em" }}>${this.props.total}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "0.9em" }}>Vat:</p>
                <p style={{ fontSize: "0.9em" }}>
                  ${this.props.pdv.toFixed(2)}
                </p>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Card.Title style={{ fontSize: "1em" }}>
                  All Together
                </Card.Title>
                <Card.Title style={{ fontSize: "1em" }}>
                  $ {this.props.totalPrice.toFixed(2)}
                </Card.Title>
              </div>

              <Button
                onClick={this.props.showModalHandler}
                style={{ width: "100%" }}
                variant="primary"
              >
                Order
              </Button>
              <Button
                onClick={this.props.clearCart}
                style={{ width: "100%", marginTop: "10px" }}
                variant="primary"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    }
    if (this.props.products.length === 0 && !this.props.loading) {
      cart = (
        <div className={classes.Empty}>
          <h3>The Cart is Empty</h3>
        </div>
      );
    }
    return (
      <Container style={{ padding: "50px 0px 50px 20px" }}>
        {this.props.loading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spinner />
          </div>
        ) : (
          cart
        )}
        <Modal />
      </Container>
    );
  }
}
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
