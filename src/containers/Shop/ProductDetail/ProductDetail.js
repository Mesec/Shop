import React, { useEffect } from "react";
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

const ProductDetail = (props) => {
  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    let productId;

    for (let param of query.entries()) {
      productId = param[0];
    }

    props.getProductHandler(productId);
  }, []);

  return (
    <Container className={classes.Container}>
      <Row>
        {props.loading ? (
          <div className={classes.Spinner}>
            <Spinner />
          </div>
        ) : (
          <Card className={classes.Card}>
            <div className={classes.Controls}></div>
            <Card.Header>
              <h5>{props.product ? props.product.name : null}</h5>
              <p className={classes.ID}>
                SKU: {props.product ? props.product._id : null}
              </p>
            </Card.Header>
            <div className={classes.CardBody}>
              <div>
                <Card.Body className={classes.LeftSide}>
                  <div className={classes.ImageContainer}>
                    <Card.Img
                      src={props.product ? props.product.image : null}
                      alt={props.product ? props.product.name : null}
                    />
                  </div>
                </Card.Body>
              </div>
              <Card.Body className={classes.RightSide}>
                <div>
                  <h6
                    style={
                      props.product && !props.product.amount
                        ? { color: "#d60000" }
                        : { color: "black" }
                    }
                  >
                    IN STOCK: {props.product ? props.product.amount : null}
                  </h6>
                  <h6>Price: ${props.product ? props.product.price : null}</h6>
                </div>
                <p>{props.product ? props.product.description : null}</p>
              </Card.Body>
            </div>
            <Card.Footer>
              <div className={classes.AddToCartActions}>
                <span>
                  {props.product && !props.product.amount ? 0 : props.quantity}
                </span>
                <div className={classes.Buttons}>
                  <Button
                    className={classes.ActionButtons}
                    variant="info"
                    disabled={props.product && !props.product.amount}
                    onClick={() => props.increaseQuantity(props.product.amount)}
                  >
                    +
                  </Button>
                  <Button
                    className={classes.ActionButtons}
                    variant="info"
                    disabled={props.product && !props.product.amount}
                    onClick={props.decreaseQuantity}
                  >
                    -
                  </Button>
                </div>
                <Button
                  className={classes.ActionButtons}
                  variant="info"
                  disabled={props.product && !props.product.amount}
                  onClick={() => {
                    localStorage.getItem("token")
                      ? props.addToCartHandler({
                          productId: props.product._id,
                          quantity: props.quantity,
                          history: props.history,
                        })
                      : props.history.push({
                          pathname: "/login",
                          state:
                            props.history.location.pathname +
                            props.history.location.search,
                        });
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  className={classes.GoBackButton}
                  variant="danger"
                  onClick={props.history.goBack}
                >
                  Go Back
                </Button>
              </div>
            </Card.Footer>
          </Card>
        )}
      </Row>
    </Container>
  );
};

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
    addToCartHandler: (cartData) => dispatch(cartActions.addToCart(cartData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetail));
