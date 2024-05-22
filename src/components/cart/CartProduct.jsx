import { Link } from "react-router-dom";

const CartProduct = (props) => {
  const { product } = props;

  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <img
              src={product.image}
              width="80"
              alt="..."
            />
          </div>
          <div className="col">
            <Link to="/product/detail" className="text-decoration-none">
              {product.description}
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
          <input type="text" className="form-control" defaultValue={product.quantity} />
          <button className="btn btn-primary text-white" type="button">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </td>
      <td>
        <var className="price">{product.price * (1 - product.discount_percent) * product.quantity}</var>
        <small className="d-block text-muted">{product.price} each</small>
      </td>
      <td className="text-end">
        <button className="btn btn-sm btn-outline-secondary me-2">
          <i className="bi bi-heart-fill"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
