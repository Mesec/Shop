import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Products from "../../containers/Shop/Products/Products";
import ProductDetail from "../../containers/Shop/ProductDetail/ProductDetail";
import ProductTypes from "../../containers/Shop/ProductTypes/ProductTypes";

import AdminProducts from "../../containers/Admin/AdminProducts";
import Login from "../../containers/Auth/Login/Login";
import Register from "../../containers/Auth/Register/Register";
import Cart from "../../containers/Shop/Cart/Cart";
import Orders from "../../containers/Shop/Orders/Orders";

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={() => <Products />} />
      <Route path="/products" exact component={() => <ProductTypes />} />
      <Route path="/product" exact component={() => <ProductDetail />} />
      <Route path="/cart" component={() => <Cart />} />
      <Route path="/login" component={() => <Login />} />
      <Route path="/register" component={() => <Register />} />
      {localStorage.getItem("token") ? (
        <div>
          <Route
            path="/admin/products"
            exact
            component={() => <AdminProducts />}
          />
          <Route path="/orders" component={() => <Orders />} />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Routes);
