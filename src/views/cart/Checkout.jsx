import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrderProduct from "../../components/cart/OrderProduct";
import VoucherModal from "../../components/cart/VoucherModal";

const CheckoutView = () => {
  const location = useLocation();
  const { cartProducts } = location.state || {};
  const productList = cartProducts;
  const [isProductIndexesSelected, setIsProductIndexesSelected] = useState(
    new Array(productList.length).fill(true)
  );
  const [hasNewChange, setHasNewChange] = useState(false)
  const [shippingFee, setShippingFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(() => {
    let sum = 0;
    productList.forEach((product, index) => {
      if (isProductIndexesSelected[index]) {
        sum += product.price * product.quantity;
      }
    });
    return sum;
  });

  const [showVoucherWindow, setShowVoucherWindow] = useState(false);
  const voucherModalRef = useRef(null);

  const handleCloseVoucherWindow = () => {
    setShowVoucherWindow(false);
  };

  const handleShowModal = () => {
    if (voucherModalRef.current) {
      voucherModalRef.current.style.display = "block";
    }
  };

  const handleHideModal = () => {
    if (voucherModalRef.current) {
      voucherModalRef.current.style.display = "none";
    }
  };

  function currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    productList.forEach((product, index) => {
      if (isProductIndexesSelected[index]) console.log(product);
    });
  };

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6 text-center">Checkout</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="container mb-3">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card mb-3">
                <div className="card-header">
                  <i className="bi bi-envelope"></i> Contact Info
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        aria-label="Email Address"
                        value="user@example.com"
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile no"
                        aria-label="Mobile no"
                        value="123-456-7890"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts &&
                        cartProducts.map((product, index) => (
                          <OrderProduct
                            key={index}
                            index={index}
                            product={product}
                            setHasNewChange={setHasNewChange}
                            isProductIndexesSelected={isProductIndexesSelected}
                            setIsProductIndexesSelected={
                              setIsProductIndexesSelected
                            }
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                style={{
                  paddingRight: "20px",
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <div>
                  <div
                    className="text-end mb-1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ marginRight: "1em" }}>Ship fee: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(shippingFee)}
                    </span>
                  </div>
                  <div
                    className="text-end mb-1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ marginRight: "1em" }}>Total: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(totalPrice)}
                    </span>
                  </div>
                  <div
                    className="text-end mb-1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ marginRight: "1em" }}>
                      Total with ship:{" "}
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(shippingFee + totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">Shipping Infomation</div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        disabled
                      />
                    </div>
                    <div className="col-md-12">
                      <button onClick={handleShowModal}>Chọn voucher</button>
                      <VoucherModal
                        ref={voucherModalRef}
                        onClose={handleCloseVoucherWindow}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3 border-info">
                <div className="card-header bg-info">
                  <i className="bi bi-credit-card-2-front"></i> Payment Method
                </div>
                <div className="card-body">
                  <div className="rowg-3 mb-3 border-bottom">
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          id="credit"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          defaultChecked
                          required
                        />
                        <label className="form-check-label" htmlFor="credit">
                          Credit card
                          <img
                            src="../../images/payment/cards.webp"
                            alt="..."
                            className="ms-3"
                            height={26}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check">
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          required
                        />
                        <label className="form-check-label" htmlFor="paypal">
                          PayPal
                          <img
                            src="../../images/payment/paypal_64.webp"
                            alt="..."
                            className="ms-3"
                            height={26}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name on card"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Card number"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Expiration month"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Expiration year"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="CVV"
                        required
                      />
                    </div>
                  </div> */}
                </div>
                <div className="card-footer border-info d-grid">
                  <button type="submit" className="btn btn-info">
                    <strong>Create Order</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutView;
