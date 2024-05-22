import { Link } from "react-router-dom";
import "./cart-product.css";

const CartProduct = (props) => {
  const {
    product,
    setSelectedProductId,
    setSelectedSize,
    setSelectedColor,
    setFormAction,
  } = props;

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
              <Link to="/product/detail" className="text-decoration-none">
                {product.name}
              </Link>
              <p className="small text-muted">
                Size: {product.size}, Color: {product.color}, Brand: {"..."}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className="input-group input-group-sm mw-140">
            <button className="btn btn-primary text-white" type="button">
              <i className="bi bi-dash-lg"></i>
            </button>
            <input
              type="text"
              className="form-control"
              defaultValue={product.quantity}
            />
            <button className="btn btn-primary text-white" type="button">
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </td>
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
        <td className="text-end">
          <button
            type="button"
            className="btn btn-sm me-2 btn-outline-primary same-background-forever"
          >
            <input
              class="form-check-input select-product-input"
              type="checkbox"
              defaultChecked="true"
              id="product-check-box"
            />
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => {
              setFormAction("ADD_PRODUCT_TO_WISHLIST");
              setSelectedProductId(product.id);
              setSelectedColor(product.color);
              setSelectedSize(product.size);
            }}
          >
            <i className="bi bi-heart-fill"></i>
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
