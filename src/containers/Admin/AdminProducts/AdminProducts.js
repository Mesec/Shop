import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/products";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import EditProductModal from "../../../components/Modal/EditProductModal";
import DeleteProductModal from "../../../components/Modal/DeleteProductModal";

class AdminProducts extends Component {
  state = {
    product: {
      name: "",
      type: "",
      image: "",
      amount: "",
      price: "",
      description: "",
    },
    path: null,
  };
  componentDidMount() {
    this.setState({ path: this.props.history.location.pathname });
    this.props.getProductsHandler();
  }
  render() {
    let products = (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner />
      </div>
    );
    if (!this.props.loading) {
      products = (
        <ProductCard products={this.props.products} path={this.state.path} />
      );
    }
    return (
      <div style={{ padding: "50px 0px 50px 20px" }}>
        <EditProductModal />
        <DeleteProductModal />
        {products}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    productToUpdate: state.products.productToUpdate,
  };
};

const mapDispatchToProps = dispactch => {
  return {
    getProductsHandler: () => dispactch(actions.getProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminProducts));
