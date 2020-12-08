import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Products from "../../containers/Shop/Products/Products";
import AddProduct from "../../containers/Admin/AddProduct/AddProduct";
import ProductDetail from "../../containers/Shop/ProductDetail/ProductDetail";
import AdminProducts from "../../containers/Admin/AdminProducts/AdminProducts";
import Login from "../../containers/Auth/Login/Login";
import Register from "../../containers/Auth/Register/Register";
import Cart from "../../containers/Shop/Cart/Cart";
import Orders from "../../containers/Shop/Orders/Orders";

const routes = () => {
  let isAuth;
  if (localStorage.getItem("token")) {
    isAuth = true;
  } else {
    isAuth = false;
  }
  return (
    <Switch>
      <Route path="/" exact component={() => <Products />} />
      <Route path="/products" exact component={() => <Products />} />
      <Route path="/product" exact component={() => <ProductDetail />} />
      <Route path="/cart" component={() => <Cart />} />
      <Route path="/login" component={() => <Login />} />
      <Route path="/register" component={() => <Register />} />
      {isAuth ? (
        <div>
          <Route
            path="/admin/products"
            exact
            component={() => <AdminProducts />}
          />
          <Route
            path="/admin/add-product"
            exact
            component={() => <AddProduct />}
          />
          <Route path="/orders" component={() => <Orders />} />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  );
};

export default routes;
