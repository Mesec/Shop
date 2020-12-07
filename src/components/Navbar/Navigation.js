import React from "react";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import ToggleButton from "../ToggleButton/Toggle";

const navigation = (props) => {
  let token = localStorage.getItem("token");

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <ToggleButton />

      <Navbar.Brand as={NavLink} to="/">
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
              <Nav.Link as={NavLink} to="/cart">
                Cart
              </Nav.Link>
            </NavItem>
          ) : null}
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
                Admin Products
              </Nav.Link>
            </NavItem>
          ) : null}
          {token ? (
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/add-product">
                Add Product
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
                  onClick={props.logoutHandler}
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

export default navigation;
