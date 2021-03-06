import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/order";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import classes from "./Orders.module.css";

const Orders = (props) => {
  useEffect(() => {
    props.getOrders();
  }, []);
  let orders = null;

  if (props.orders) {
    orders = props.orders.map((order) => {
      return (
        <Card className={classes.Card}>
          <Card.Header className={classes.Header}>
            <h6 style={{ margin: "0", padding: "0" }}>23.04.2020</h6>
          </Card.Header>
          <Card.Body>
            <Table className={classes.Table} striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.fullName}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                </tr>
              </tbody>
            </Table>
            {/* <hr /> */}
            <Table className={classes.Table} striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => {
                  return (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>${product.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className={classes.Footer}>
            <p className={classes.TotalPrice}>
              Total Price: $ {order.totalPrice}
            </p>
          </Card.Footer>
        </Card>
      );
    });
  }

  return <Container className={classes.Container}>{orders}</Container>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.userOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(orderActions.getUserOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
