import { Link } from "react-router-dom";

const CartProduct = () => {
  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-3 d-none d-md-block">
            <img
              src="../../images/products/tshirt_red_480x400.webp"
              width="80"
              alt="..."
            />
          </div>
          <div className="col">
            <Link to="/product/detail" className="text-decoration-none">
              Another name of some product goes just here
            </Link>
            <p className="small text-muted">
              Size: XL, Color: blue, Brand: XYZ
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="input-group input-group-sm mw-140">
          <button className="btn btn-primary text-white" type="button">
            <i className="bi bi-dash-lg"></i>
          </button>
          <input type="text" className="form-control" defaultValue="1" />
          <button className="btn btn-primary text-white" type="button">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </td>
      <td>
        <var className="price">$237.00</var>
        <small className="d-block text-muted">$79.00 each</small>
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
