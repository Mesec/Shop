import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/products";
import classes from "./Products.module.css";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import Container from "react-bootstrap/Container";

const Products = (props) => {
  const [path, changePath] = useState(null);

  useEffect(() => {
    changePath(props.history.location.pathname);
    const query = new URLSearchParams(props.location.search);
    let queryParam;
    for (let param of query.entries()) {
      queryParam = param[0];
    }
    if (queryParam === "") {
      props.getProductsHandler();
    } else {
      props.getProductsHandler(queryParam);
    }
  }, []);

  const setQueryParamsForProductDetail = (productId) => {
    props.history.push({
      pathname: "/product",
      search: "?" + productId,
    });
  };

  let cart = (
    <ProductCard
      products={props.products}
      path={path}
      click={setQueryParamsForProductDetail}
    />
  );
  if (props.loading) {
    cart = <Spinner />;
  }
  return (
    <Container fluid className={classes.Container}>
      {cart}
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
