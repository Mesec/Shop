import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as cartActions from "../../../store/actions/cart";
import * as productActions from "../../../store/actions/products";

import classes from "./ProductDetail.module.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Spinner from "../../../components/Spinner/Spinner";

class ProductDetail extends Component {
  state = {
    product: null,
    productId: null,
    quantity: 1,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let productId;

    for (let param of query.entries()) {
      productId = param[0];
    }

    this.props.getProductHandler(productId);
  }

  addToCartHandler = (event, cartData) => {
    event.preventDefault();
    this.props.addToCart(cartData);
    this.props.history.replace("/cart");
  };
  render() {
    return (
      <Container style={{ padding: "20px 0px 50px 20px" }}>
        <Row>
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
            <Card
              size="sm"
              style={{
                border: "none",
                position: "relative",
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <Card.Header>
                <h5>{this.props.product ? this.props.product.name : null}</h5>
                <p className={classes.ID}>
                  SKU: {this.props.product ? this.props.product._id : null}
                </p>
              </Card.Header>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    height: "200px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card.Img
                    style={{ maxHeight: "100%", maxWidth: "80%" }}
                    variant="top"
                    src={this.props.product ? this.props.product.image : null}
                    alt={this.props.product ? this.props.product.name : null}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className={classes.AddToCartActions}>
                  <h6>
                    In stock:{" "}
                    {this.props.product ? this.props.product.amount : null}
                  </h6>
                  <h4>
                    Price: $
                    {this.props.product ? this.props.product.price : null}
                  </h4>
                  <div className={classes.SelectAmount}>
                    <span>{this.props.quantity}</span>
                    <div className={classes.Buttons}>
                      <button
                        onClick={() =>
                          this.props.increaseQuantity(this.props.product.amount)
                        }
                      >
                        +
                      </button>
                      <button onClick={this.props.decreaseQuantity}>-</button>
                    </div>
                    <Button
                      onClick={(event) => {
                        localStorage.getItem("token")
                          ? this.addToCartHandler(event, {
                              productId: this.props.product._id,
                              quantity: this.props.quantity,
                            })
                          : this.props.history.push("/login");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.product,
    loading: state.products.loading,
    quantity: state.cart.quantity,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductHandler: (productId) =>
      dispatch(productActions.getSingleProduct(productId)),
    increaseQuantity: (maxQuantity) =>
      dispatch(cartActions.increaseQuantity(maxQuantity)),
    decreaseQuantity: () => dispatch(cartActions.decreaseQuantity()),
    addToCart: (cartData) => dispatch(cartActions.addToCart(cartData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetail));
