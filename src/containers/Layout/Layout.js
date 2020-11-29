import React from "react";

import Navigation from "../../components/Navbar/Navigation";

const layout = props => {
  return (
    <div>
      <header>
        <Navigation isAuth={props.isAuth} logoutHandler={props.logoutHandler} />
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default layout;
