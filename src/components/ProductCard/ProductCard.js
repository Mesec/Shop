import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./ProductCart.module.css";

const productCard = (props) => {
  let card = null;
  if (props.products) {
    card = props.products.map((product) => {
      return (
        <Col md="auto" key={product._id} className={classes.Col}>
          <Card className={classes.Card}>
            <div
              className={classes.ImageContainer}
              onClick={() => props.click(product._id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={classes.Image}
              />
            </div>
            <div className={classes.CardBody}>
              <div className={classes.Header}>
                <h5>{product.name}</h5>
              </div>
              <div className={classes.Price}>
                {props.path === "/" || props.history.location.search ? (
                  <h4>${product.price}</h4>
                ) : null}
              </div>
              {props.path === "/" || props.history.location.search !== "" ? (
                <div className={classes.ButtonContainerUser}>
                  <Button
                    size="sm"
                    onClick={() => props.click(product._id)}
                    className={classes.Button}
                    variant="primary"
                  >
                    Details
                  </Button>
                </div>
              ) : (
                <div className={classes.ButtonContainerAdmin}>
                  <Button
                    size="sm"
                    className={classes.Button}
                    variant="primary"
                    onClick={() => props.updProdShowModalHandler(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className={classes.Button}
                    variant="primary"
                    onClick={() => props.delProdShowModalHandler(product)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </Col>
      );
    });
  }

  return (
    <Container fluid className={classes.Container}>
      <Row className={classes.Row}>{card}</Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updProdShowModalHandler: (product) =>
      dispatch(actions.updProdShowModal(product)),
    delProdShowModalHandler: (product) =>
      dispatch(actions.delProdShowModal(product)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(productCard));
