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
    // this.props.history.replace("/cart");
  };
  render() {
    return (
      <Container className={classes.Container}>
        <Row>
          {this.props.loading ? (
            <div className={classes.Spinner}>
              <Spinner />
            </div>
          ) : (
            <Card className={classes.Card}>
              <Card.Header>
                <h5>{this.props.product ? this.props.product.name : null}</h5>
                <p className={classes.ID}>
                  SKU: {this.props.product ? this.props.product._id : null}
                </p>
              </Card.Header>
              <div className={classes.CardBody}>
                <div>
                  <Card.Body className={classes.LeftSide}>
                    <div className={classes.ImageContainer}>
                      <Card.Img
                        src={
                          this.props.product ? this.props.product.image : null
                        }
                        alt={
                          this.props.product ? this.props.product.name : null
                        }
                      />
                    </div>
                  </Card.Body>
                </div>
                <Card.Body className={classes.RightSide}>
                  <div>
                    <h6>
                      In stock:{" "}
                      {this.props.product ? this.props.product.amount : null}
                    </h6>
                    <h6>
                      Price: $
                      {this.props.product ? this.props.product.price : null}
                    </h6>
                  </div>
                  <p>
                    {this.props.product ? this.props.product.description : null}
                  </p>
                </Card.Body>
              </div>
              <Card.Footer>
                <div className={classes.AddToCartActions}>
                  <span>{this.props.quantity}</span>
                  <div className={classes.Buttons}>
                    <Button
                      onClick={() =>
                        this.props.increaseQuantity(this.props.product.amount)
                      }
                    >
                      +
                    </Button>
                    <Button onClick={this.props.decreaseQuantity}>-</Button>
                  </div>
                  <Button
                    onClick={(event) => {
                      localStorage.getItem("token")
                        ? this.addToCartHandler(event, {
                            productId: this.props.product._id,
                            quantity: this.props.quantity,
                            history: this.props.history,
                          })
                        : this.props.history.push({
                            pathname: "/login",
                            state:
                              this.props.history.location.pathname +
                              this.props.history.location.search,
                          });
                    }}
                  >
                    Add to Cart
                  </Button>
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
