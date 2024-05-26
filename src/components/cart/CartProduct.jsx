import { useState } from "react";
import { Link } from "react-router-dom";
import "./cart-product.css";

const CartProduct = (props) => {
  const {
    index,
    product,
    setSelectedProductId,
    setSelectedSize,
    setSelectedColor,
    setFormAction,
    setNewProductQuantity,
    setSelectedProducts,
  } = props;

  const [productQuantity, setProductQuantity] = useState(product.quantity);

  function currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedProducts((oldArray) => [...oldArray, product]);
    } else {
      setSelectedProducts((l) => l.filter((item) => (item.id !== product.id || item.color !== product.color || item.size !== product.size)));
    }
  };

  return (
    <tr>
      <td>
        <div className="row">
          <div
            className="col-3 "
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img src={product.image} width="80" height="80" alt="..." />
          </div>
          <div className="col">
            <label>
              <Link
                to={`/product/detail?product=${product.id}`}
                className="text-decoration-none"
              >
                {product.name}
              </Link>
            </label>
            <p className="small text-muted">
              Size: {product.size}, Color: {product.color}, Brand: {"..."}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="input-group input-group-sm mw-140">
          <button
            className="btn btn-primary text-white"
            type="button"
            onClick={() => {
              if (productQuantity > 1) setProductQuantity(productQuantity - 1);
            }}
          >
            <i className="bi bi-dash-lg"></i>
          </button>
          <input
            type="text"
            className="form-control"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          <button
            className="btn btn-primary text-white"
            type="button"
            onClick={() => {
              if (productQuantity < 99) setProductQuantity(productQuantity + 1);
            }}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </td>
      <td>
        <var className="price" style={{ fontStyle: "normal" }}>
          {currencyFormat(
            product.price * (1 - product.discount_percent) * productQuantity
          )}
        </var>
        <small className="d-block text-muted">
          {currencyFormat(product.price)} each
        </small>
      </td>
      <td className="text-end" style={{ minWidth: "150px" }}>
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "default",
            marginRight: "8px",
          }}
        >
          <input
            clas
            class="form-check-input"
            type="checkbox"
            value={0}
            id={"product_" + 0}
            onChange={handleCheckboxChange}
            defaultChecked="true"
          ></input>
        </button>

        <button
          type="submit"
          className="btn btn-sm btn-outline-secondary me-2"
          onClick={() => {
            setFormAction("UPDATE_PRODUCT_QUANTITY_IN_CART");
            setSelectedProductId(product.id);
            setSelectedColor(product.color);
            setSelectedSize(product.size);
            setNewProductQuantity(productQuantity);
          }}
        >
          Save
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            setFormAction("DELETE_PRODUCT_FROM_CART");
            setSelectedProductId(product.id);
            setSelectedColor(product.color);
            setSelectedSize(product.size);
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
