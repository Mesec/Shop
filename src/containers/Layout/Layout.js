import React from "react";

import classes from "./Layout.module.css";

import Navigation from "../../components/Navbar/Navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import Backdrop from "../../components/Backdrop/Backdrop";

<Sidebar />;

const layout = (props) => {
  return (
    <div className={classes.Layout}>
      <header className={classes.Header}>
        <Navigation isAuth={props.isAuth} logoutHandler={props.logoutHandler} />
        <Sidebar />
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default layout;
