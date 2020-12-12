import React from "react";
import classes from "./Filter.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";
import ToggleBtn from "../ToggleButton/Toggle";

const Filter = (props) => {
  return (
    <div className={classes.Filter}>
      <div className={classes.Header}>
        <ToggleBtn />
        <input
          type="text"
          placeholder="Search"
          onChange={(event) =>
            props.searchForProductHandler(event, props.products)
          }
        />
      </div>
      <div className={classes.Container}>
        <h6>Price</h6>
        <hr />
        <div className={classes.Actions}>
          <input id="50" type="checkbox" />
          <label htmlFor="50">0-50$</label>
        </div>
        <div className={classes.Actions}>
          <input id="50" type="checkbox" />
          <label htmlFor="50">50$-100$</label>
        </div>
        <div className={classes.Actions}>
          <input id="50" type="checkbox" />
          <label htmlFor="50">100$-200$</label>
        </div>
        <div className={classes.Actions}>
          <input id="50" type="checkbox" />
          <label htmlFor="50">200$ and more</label>
        </div>
      </div>
      <div className={classes.Container}>
        <h6>Brands</h6>
        <hr />
        <div className={classes.Actions}>
          <input type="checkbox" />
          <label>Brand1</label>
        </div>
        <div className={classes.Actions}>
          <input type="checkbox" />
          <label>Brand2</label>
        </div>
        <div className={classes.Actions}>
          <input type="checkbox" />
          <label>Brand3</label>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchForProductHandler: (event, products) =>
      dispatch(actions.searchForProduct(event, products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
