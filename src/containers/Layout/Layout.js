import React from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";

import Navigation from "../../components/Navbar/Navigation";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrop from "../../components/Backdrop/Backdrop";

const layout = (props) => {
  const backdrop = props.showSideDrawer ? <Backdrop /> : null;

  //Disabling scroll when side drawer is shown
  document.getElementsByTagName("BODY")[0].className = props.showSideDrawer
    ? classes.NoScroll
    : classes.WithScroll;

  return (
    <div className={classes.Layout}>
      <header className={classes.Header}>
        <Navigation isAuth={props.isAuth} />
        {backdrop}
        <SideDrawer />
      </header>
      <main>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.products.isSideDrawerShown,
    products: state.products.products,
    productTypes: state.products.productTypes,
  };
};

export default connect(mapStateToProps)(layout);
