import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/products";
import classes from "./ProductTypes.module.css";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import Container from "react-bootstrap/Container";
import ToggleBtn from "../../../components/ToggleButton/Toggle";
import Filter from "../../../components/Filter/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Products = (props) => {
  const [path, changePath] = useState(null);
  const [search, setSearch] = useState(null);
  const [prods, updateProducts] = useState(null);
  useEffect(() => {
    changePath(props.history.location.pathname);
    const query = new URLSearchParams(props.location.search);
    let queryParam;
    for (let param of query.entries()) {
      queryParam = param[0];
    }
    if (queryParam === "") {
      props.getProductsHandler();
      updateProducts(props.products);
    } else {
      props.getProductsHandler(queryParam);
      updateProducts(props.products);
    }
  }, []);

  const setQueryParamsForProductDetail = (productId) => {
    setSearch(productId);
    props.history.push({
      pathname: "/product",
      search: "?" + productId,
    });
  };

  let products = (
    <div className={classes.Products}>
      <div className={classes.Type}>
        <span>{props.history.location.search.split("?")[1]}s</span>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className={classes.Icon}
          onClick={() => props.history.push("/")}
        />
      </div>
      <div className={classes.ProductCard}>
        <ProductCard
          products={props.products}
          path={path}
          click={setQueryParamsForProductDetail}
        />
      </div>
    </div>
  );
  if (props.loading) {
    products = <Spinner />;
  }

  if (props.products && props.products.length === 0) {
    products = (
      <div className={classes.NoProductsFound}>
        <h3>No products found</h3>
      </div>
    );
  }
  return (
    <Container fluid className={classes.Container}>
      <Filter />
      {products}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsHandler: (type) => dispatch(actions.getProducts(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
