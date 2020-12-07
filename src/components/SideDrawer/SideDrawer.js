import React from "react";
import classes from "./SideDrawer.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const sideDrawer = (props) => {
  const sideDrawerClasses = [
    classes.SideDrawer,
    props.showSideDrawer ? classes.SideDrawerVisible : classes.SideDrawerHidden,
  ];
  let types = null;
  if (props.productTypes) {
    types = props.productTypes.map((type) => {
      return (
        <h6
          onClick={() => {
            props.getProductsHandler(type);
            props.history.push({
              pathname: "/products",
              search: "?" + type,
            });
          }}
          key={type}
        >
          {type}
        </h6>
      );
    });
  }

  return (
    <Container fluid className={sideDrawerClasses.join(" ")}>
      <Card className={classes.Card}>
        <Card.Header className={classes.Header}>
          <h5 className={classes.Banner}>Online-Shop</h5>
          <h3 className={classes.Close} onClick={props.hideSideDrawer}>
            x
          </h3>
        </Card.Header>
        <Card.Body className={classes.Body}>
          <div className={classes.Categories}>
            <h6>Categories</h6>
          </div>
          <div className={classes.Category}>{types}</div>
        </Card.Body>
      </Card>
      {props.children}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.products.showSideDrawer,
    products: state.products.products,
    productTypes: state.products.productTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSideDrawer: () => dispatch(actions.hideSideDrawer()),
    getProductsHandler: (type) => dispatch(actions.getProducts(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(sideDrawer));