import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Layout from "./containers/Layout/Layout";
import Products from "./containers/Shop/Products/Products";
import AddProduct from "./containers/Admin/AddProduct/AddProduct";
import ProductDetail from "./containers/Shop/ProductDetail/ProductDetail";
import AdminProducts from "./containers/Admin/AdminProducts/AdminProducts";
import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";
import Cart from "./containers/Shop/Cart/Cart";
import Orders from "./containers/Shop/Orders/Orders";

class App extends Component {
  state = {
    errors: false,
    loading: false,
  };

  logoutUserHandler = () => {
    localStorage.removeItem("token");
    this.setState({ isAuth: false });
  };
  render() {
    document.getElementsByTagName("BODY")[0].className = this.props
      .showSideDrawer
      ? classes.NoScroll
      : classes.WithScroll;

    let isAuth;
    if (localStorage.getItem("token")) {
      isAuth = true;
    } else {
      isAuth = false;
    }
    return (
      <Container fluid className={classes.App}>
        <Layout logoutHandler={this.logoutUserHandler}>
          <Switch>
            <Route path="/" exact component={() => <Products />} />
            <Route path="/products" exact component={() => <Products />} />

            <Route path="/product" exact component={() => <ProductDetail />} />
            <Route path="/cart" component={() => <Cart />} />

            <Route
              path="/login"
              component={() => (
                <Login
                  errors={this.state.errors}
                  loading={this.state.loading}
                />
              )}
            />
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
        </Layout>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(withRouter(App));
