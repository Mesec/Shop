import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/products";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../Spinner/Spinner";

const modal = (props) => {
  return (
    <Modal show={props.isModalShown} onHide={props.hideModalHandler}>
      <Modal.Header>
        <p>Do you want to delete this product ?</p>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => props.deleteProduct(props.productToDelete)}
        >
          Yes
        </Button>
        <Button variant="secondary" onClick={props.hideModalHandler}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalShown: state.products.deletePrModal,
    productToDelete: state.products.productToDelete,
    loading: state.products.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModalHandler: () => dispatch(actions.delProdHideModal()),
    deleteProduct: (product) => dispatch(actions.deleteProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modal);
