import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/products";
import classes from "./AdminProducts.module.css";

import Container from "react-bootstrap/Container";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Spinner from "../../../components/Spinner/Spinner";
import EditProductModal from "../../../components/Modal/EditProductModal";
import AddProductModal from "../../../components/Modal/AddProductModal";
import DeleteProductModal from "../../../components/Modal/DeleteProductModal";
import addIcon from "../../../images/plus.png";

const AdminProducts = (props) => {
  const [path, changePath] = useState(null);

  useEffect(() => {
    changePath(props.history.location.pathname);
    props.getProductsHandler();
  }, []);
  let products = <Spinner />;
  if (!props.loading) {
    products = <ProductCard products={props.products} path={path} />;
  }
  return (
    <Container fluid className={classes.Container}>
      <div className={classes.Controls}>
        <p>Add Product</p>
        <span>
          <img src={addIcon} alt="" onClick={props.showAddProductModal} />
        </span>
      </div>
      <EditProductModal />
      <DeleteProductModal />
      <AddProductModal />
      {products}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    productToUpdate: state.products.productToUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsHandler: () => dispatch(actions.getProducts()),
    showAddProductModal: () => dispatch(actions.showAddProductModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminProducts));
