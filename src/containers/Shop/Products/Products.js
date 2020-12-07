import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/products";
import classes from "./Products.module.css";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";

class Products extends Component {
  state = {
    path: null,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let productId;

    for (let param of query.entries()) {
      productId = param[0];
    }
    this.setState({ path: this.props.history.location.pathname });

    if (this.props.history.location.search === "") {
      this.props.getProductsHandler();
    } else {
      this.props.getProductsHandler(productId);
    }
  }
  setQueryParamsForProductDetail = (productId) => {
    this.props.history.push({
      pathname: "/product",
      search: "?" + productId,
    });
  };
  render() {
    return (
      <div className={classes.Container}>
        {this.props.loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Spinner />
          </div>
        ) : (
          <ProductCard
            products={this.props.products}
            path={this.state.path}
            click={this.setQueryParamsForProductDetail}
          />
        )}
      </div>
    );
  }
}

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
