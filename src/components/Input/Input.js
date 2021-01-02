import React from "react";
import * as actions from "../../store/actions/products";
import { connect } from "react-redux";

const input = (props) => {
  return (
    <input
      type="text"
      placeholder="Search"
      onKeyDown={(event) => {
        if (event.code === "Enter") {
          props.filterByInputValue(event);
        }
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterByInputValue: (event) => dispatch(actions.filterByInputValue(event)),
  };
};

export default connect(null, mapDispatchToProps)(input);
