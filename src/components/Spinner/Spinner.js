import React from "react";
import Spinner from "react-bootstrap/Spinner";

const spinner = () => {
  return (
    <Spinner animation="border" role="status" size="lg">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default spinner;
