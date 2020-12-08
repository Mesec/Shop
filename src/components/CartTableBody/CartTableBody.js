import React from "react";
import { connect } from "react-redux";

const Table = (props) => {
  return (
    <tbody>
      {props.products.map((product) => {
        return (
          <tr key={product._id}>
            <td>
              <div>
                <img
                  style={{ width: "40px", marginRight: "10px" }}
                  src={product.productId.image}
                  alt=""
                />{" "}
                {product.productId.name}
              </div>
            </td>
            <td>${product.productId.price}</td>
            <td>{product.quantity}</td>
            <td>${0.2 * product.productId.price}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.cart.cartProducts,
    loading: state.cart.loading,
    total: state.cart.total,
    pdv: state.cart.pdv,
    totalPrice: state.cart.totalPrice,
  };
};

export default connect(mapStateToProps)(Table);
