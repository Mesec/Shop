import React from "react";
import classes from "./Backdrop.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

const backdrop = (props) => {
  return (
    <div className={classes.Backdrop} onClick={props.hideSideDrawerHandler}>
      {props.children}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSideDrawerHandler: () => dispatch(actions.hideSideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(backdrop);
