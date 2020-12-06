import React from "react";
import classes from "./Toggle.module.css";
import { showSideDrawer } from "../../store/actions/products";
import { connect } from "react-redux";

const toggle = (props) => {
  return (
    <div className={classes.ToggleContainer}>
      <div className={classes.Toggle} onClick={props.showSideBarHandler}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSideBarHandler: () => dispatch(showSideDrawer()),
  };
};

export default connect(null, mapDispatchToProps)(toggle);
