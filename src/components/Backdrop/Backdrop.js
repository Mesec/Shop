import React from "react";
import classes from "./Backdrop.module.css";
import * as productActions from "../../store/actions/products";
import { connect } from "react-redux";

const backdrop = (props) => {
  console.log(props);
  return (
    <div
      onClick={props.hideSideDrawerHandler}
      className={classes.Backdrop}
    ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(backdrop);
