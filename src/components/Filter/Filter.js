import React, { usesTate } from "react";
import classes from "./Filter.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";
import ToggleBtn from "../ToggleButton/Toggle";
import searchIcon from "../../images/loupe.png";

const Filter = (props) => {
  return (
    <div className={classes.Filter}>
      <div className={classes.Header}>
        <input
          type="text"
          placeholder="Search"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              props.filterByInputValue(event);
            }
          }}
        />
        <ToggleBtn />
      </div>
      <div className={classes.Container}>
        <h6>Price</h6>
        <hr />
        {props.priceCheckboxes.map((item) => {
          return (
            <div className={classes.Actions} key={item.id}>
              <input
                id={item.id}
                type="checkbox"
                name={item.id}
                checked={item.checked}
                onChange={() =>
                  props.filterByPrice(item.id, item.min, item.max)
                }
              />
              <label htmlFor={item.id}>{item.description}</label>
            </div>
          );
        })}
      </div>
      <div className={classes.Container}>
        <h6>Brand</h6>
        <hr />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.filteredProducts,
    priceCheckboxes: state.products.priceCheckboxes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterByPrice: (id, min, max) =>
      dispatch(actions.filterByPrice(id, min, max)),
    filterByInputValue: (event) => dispatch(actions.filterByInputValue(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
