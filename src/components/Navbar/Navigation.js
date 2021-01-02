import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";

import classes from "./Navbar.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import ToggleButton from "../ToggleButton/Toggle";
import cartIcon from "../../images/shopping-cart.svg";

const Navigation = (props) => {
  const token = localStorage.getItem("token");
  return (
    <Navbar bg="info" variant="dark" expand="md" className={classes.Navbar}>
      {/* <ToggleButton /> */}

      <Navbar.Brand as={NavLink} to="/" className={classes.Brand}>
        Online-Shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavItem>
            <Nav.Link as={NavLink} to="/" exact>
              Products
            </Nav.Link>
          </NavItem>

          {token ? (
            <NavItem>
              <Nav.Link as={NavLink} to="/orders">
                Orders
              </Nav.Link>
            </NavItem>
          ) : null}
          {token ? (
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/products">
                Admin
              </Nav.Link>
            </NavItem>
          ) : null}
          {token ? (
            <NavItem>
              <Nav.Link as={NavLink} to="/cart">
                Cart
              </Nav.Link>
            </NavItem>
          ) : null}
        </Nav>

        <Nav>
          <Navbar.Collapse>
            {!token ? (
              <NavItem>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </NavItem>
            ) : null}
            {!token ? (
              <NavItem>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </NavItem>
            ) : (
              <NavItem>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={props.logoutUserHandler}
                >
                  Logout
                </Nav.Link>
              </NavItem>
            )}
          </Navbar.Collapse>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUserHandler: () => dispatch(authActions.logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
