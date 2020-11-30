import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/products";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";

class Products extends Component {
  state = {
    path: null,
  };
  componentDidMount() {
    this.setState({ path: this.props.history.location.pathname });
    this.props.getProductsHandler();
  }
  setQueryParamsForProductDetail = (movieId) => {
    this.props.history.push({
      pathname: "/product",
      search: "?" + movieId,
    });
  };
  render() {
    return (
      <div style={{ padding: "50px 0px 50px 20px" }}>
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
    getProductsHandler: () => dispatch(actions.getProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
