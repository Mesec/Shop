import React from "react";
import classes from "./SideDrawer.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Backdrop from "../Backdrop/Backdrop";

const sideDrawer = (props) => {
  const sideDrawerClasses = [
    classes.SideDrawer,
    props.showSideDrawer ? classes.SideDrawerVisible : classes.SideDrawerHidden,
  ];

  return (
    <Container fluid className={sideDrawerClasses.join(" ")}>
      <Card className={classes.Card}>
        <Card.Header className={classes.Header}>
          <h5 className={classes.Banner}>Online-Shop</h5>
          <h3 className={classes.Close} onClick={props.hideSideDrawerHandler}>
            x
          </h3>
        </Card.Header>
        <Card.Body className={classes.Body}>
          <div className={classes.Categories}>
            <h6>Categories</h6>
          </div>
          <div className={classes.Category}>
            <h6>Laptops</h6>
            <h6>Telephones</h6>
            <h6>TV</h6>
            <h6>Other</h6>
          </div>
        </Card.Body>
      </Card>
      {props.children}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.products.showSideDrawer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSideDrawerHandler: () => dispatch(actions.hideSideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
