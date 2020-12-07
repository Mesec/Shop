import React from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";

import Navigation from "../../components/Navbar/Navigation";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/Backdrop/Backdrop";

const layout = (props) => {
  const backdrop = props.showSideDrawer ? <Backdrop /> : null;

  return (
    <div className={classes.Layout}>
      <header className={classes.Header}>
        <Navigation isAuth={props.isAuth} logoutHandler={props.logoutHandler} />
        {backdrop}
        <SideDrawer />
      </header>
      <main>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.products.showSideDrawer,
  };
};

export default connect(mapStateToProps)(layout);
