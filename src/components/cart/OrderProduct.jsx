import React from "react";
import { Link } from "react-router-dom";

const OrderProduct = ({
  product,
  index,
  setHasNewChange,
  isProductIndexesSelected,
  setIsProductIndexesSelected,
}) => {
  function currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const filterSelected = (event) => {
    if (event.target.checked) {
      isProductIndexesSelected[index] = true;
      setIsProductIndexesSelected(isProductIndexesSelected);
      console.log("CHANGES IN PRODUCT");
    } else {
      isProductIndexesSelected[index] = false;
      setIsProductIndexesSelected(isProductIndexesSelected);
      console.log("CHANGES IN PRODUCT");
    }
  };

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
              Size: {product.size}, Color: {product.color}, Shop: {"..."}
            </p>
          </div>
        </div>
      </td>
      <td>{product.quantity}</td>
      <td>
        <var className="price" style={{ fontStyle: "normal" }}>
          {currencyFormat(product.price)} each
        </var>
        {/* <var className="price" style={{ fontStyle: "normal" }}>
          {currencyFormat(
            product.price * (1 - product.discount_percent) * product.quantity
          )}
        </var>
        <small className="d-block text-muted">
          {currencyFormat(product.price)} each
        </small> */}
      </td>
      <td>
        {currencyFormat(
          product.price * (1 - product.discount_percent) * product.quantity
        )}
      </td>
    </tr>
  );
};

export default OrderProduct;
