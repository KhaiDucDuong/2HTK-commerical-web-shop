import React from "react";
import { Link } from "react-router-dom";

const OrderProduct = ({ product }) => {
  function currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <img src={product.image} width="80" alt="..." />
          </div>
          <div className="col">
            <Link
              to={`/product/detail?product=${product.id}`}
              className="text-decoration-none"
            >
              {product.name}
            </Link>
            <p className="small text-muted">
              Size: {product.size}, Color: {product.color}, Brand: {"..."}
            </p>
          </div>
        </div>
      </td>
      <td>{product.quantity}</td>
      <td>
        <var className="price" style={{ fontStyle: "normal" }}>
          {currencyFormat(
            product.price * (1 - product.discount_percent) * product.quantity
          )}
        </var>
        <small className="d-block text-muted">
          {currencyFormat(product.price)} each
        </small>
      </td>
    </tr>
  );
};

export default OrderProduct;