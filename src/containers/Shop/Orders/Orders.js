import React, { Component } from "react";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/order";

import Container from "react-bootstrap/Container";

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    return (
      <Container>
        <h3>ORDERS</h3>
      </Container>
    );
  }
}

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
