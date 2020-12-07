import React from "react";
import classes from "./Toggle.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

const toggle = (props) => {
  return (
    <div className={classes.ToggleContainer} onClick={props.showSideBarHandler}>
      <div className={classes.Toggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSideBarHandler: () => dispatch(actions.showSideDrawer()),
  };
};

export default connect(null, mapDispatchToProps)(toggle);
