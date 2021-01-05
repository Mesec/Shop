import React from "react";
import classes from "./SideDrawer.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const sideDrawer = (props) => {
  const sideDrawerClasses = [
    classes.SideDrawer,
    props.showSideDrawer ? classes.SideDrawerVisible : classes.SideDrawerHidden,
  ];
  let types = null;
  if (props.productTypes) {
    types = props.productTypes.map((type) => {
      return (
        <div>
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
            {type}s
          </h6>
          <FontAwesomeIcon icon={faAngleRight} className={classes.Icon} />
        </div>
      );
    });
  }

  return (
    <Container fluid className={sideDrawerClasses.join(" ")}>
      <Card className={classes.Card}>
        <Card.Header className={classes.Header}>
          <h5 className={classes.Banner}>Categories</h5>
          <h3 className={classes.Close} onClick={props.hideSideDrawer}>
            x
          </h3>
        </Card.Header>
        <Card.Body className={classes.Body}>
          <div className={classes.Category}>{types}</div>
        </Card.Body>
      </Card>
      <div>{types}</div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.products.isSideDrawerShown,
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
