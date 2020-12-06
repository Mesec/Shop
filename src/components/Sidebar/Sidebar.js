import React from "react";
import classes from "./Sidebar.module.css";
import { connect } from "react-redux";
import * as productActions from "../../store/actions/products";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Backdrop from "../Backdrop/Backdrop";

const sideDrawer = (props) => {
  console.log(props);

  const sideDrawerClasses = [
    classes.SideDrawer,
    props.showSideDrawer ? classes.SideDrawerVisible : classes.SideDrawerHidden,
  ];
  return (
    <Container fluid className={sideDrawerClasses.join(" ")}>
      <Card className={classes.Card}>
        <Card.Header className={classes.Header}>
          <h4 className={classes.Banner}>Online-Shop</h4>
          <h3 onClick={props.hideSideDrawerHandler} className={classes.Close}>
            x
          </h3>
        </Card.Header>
        <Card.Body className={classes.Body}>
          <h5 className={classes.Categories}>Categories</h5>
          <div className={classes.Category}>
            <h6>Laptops</h6>
            <h6>Telephones</h6>
            <h6>TV</h6>
            <h6>Other</h6>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.products.isSideDrawerShown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSideDrawerHandler: () => dispatch(productActions.hideSideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sideDrawer);
