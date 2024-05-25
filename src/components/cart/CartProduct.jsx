import { useState } from "react";
import { Link } from "react-router-dom";
import "./cart-product.css";

const CartProduct = (props) => {
  const {
    product,
    setSelectedProductId,
    setSelectedSize,
    setSelectedColor,
    setFormAction,
    setNewProductQuantity,
  } = props;

  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // Khởi tạo selectedProducts là một mảng trống

  function currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);

    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
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
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
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
