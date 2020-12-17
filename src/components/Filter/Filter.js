import React, { useState } from "react";
import classes from "./Filter.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";
import ToggleBtn from "../ToggleButton/Toggle";
import searchIcon from "../../images/loupe.png";

const Filter = (props) => {
  let brands = [];
  if (props.brandCheckboxes) {
    props.brandCheckboxes.forEach((brand) => {
      brands.push(brand.name);
    });
  }
  return (
    <div className={classes.Filter}>
      <div className={classes.Header}>
        <div className={classes.Search}>
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => props.searchForProductHandler(event)}
          />
          <button>
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <ToggleBtn />
      </div>
      <div className={classes.Container}>
        <h6>Price</h6>
        <hr />
        {props.priceCheckbox.map((item) => {
          return (
            <div className={classes.Actions}>
              <input
                id={item.name}
                type="checkbox"
                onChange={() =>
                  props.filterByPrice(item.min, item.max, item.id)
                }
                name={item.name}
                checked={item.checked}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          );
        })}
      </div>
      <div className={classes.Container}>
        <h6>Brands</h6>
        <hr />
        {props.brandCheckboxes
          ? props.brandCheckboxes.map((brand) => {
              return (
                <div className={classes.Actions} key={brand}>
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      props.filterByBrand(
                        brand.name,
                        props.min,
                        props.max,
                        brand.id
                      )
                    }
                    name="brand"
                    checked={brand.checked}
                  />
                  <label htmlFor={brand.name}>{brand.name}</label>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.filteredProducts,
    priceCheckbox: state.products.priceCheckboxes,
    brandCheckboxes: state.products.brandCheckboxes,
    min: state.products.filterControls.min,
    max: state.products.filterControls.max,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchForProductHandler: (event) =>
      dispatch(actions.searchForProduct(event)),
    filterByPrice: (min, max, id) =>
      dispatch(actions.filterByPrice(min, max, id)),
    filterByBrand: (brand, min, max, id) =>
      dispatch(actions.filterByBrand(brand, min, max, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
