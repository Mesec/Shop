import React from "react";
import classes from "./Spinner.module.css";

import Spinner from "react-bootstrap/Spinner";

const spinner = () => {
  return (
    <Spinner
      className={classes.Spinner}
      animation="border"
      role="status"
      size="lg"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default spinner;
