import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderProduct from "../../components/cart/OrderProduct";
import VoucherModal from "../../components/cart/VoucherModal";
import { fetchApi } from "../../hooks/useFetch";

const CheckoutView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartProducts, userData } = location.state || {};
  const productList = cartProducts;
  const [isProductIndexesSelected, setIsProductIndexesSelected] = useState(
    new Array(productList.length).fill(true)
  );
  const [hasNewChange, setHasNewChange] = useState(false);
  const [voucherData, setVoucherData] = useState();
  const [productShopVouchers, setProductShopVouchers] = useState([]);
  const [shippingVouchers, setShippingVouchers] = useState([]);
  const [userInformation, setUserInformation] = useState();
  const [selectedProductVoucher, setSelectedProductVoucher] = useState();
  const [selectedShippingVoucher, setSelectedShippingVoucher] = useState();
  const [approvedProductVoucher, setApprovedProductVoucher] = useState();
  const [approvedShippingVoucher, setApprovedShippingVoucher] = useState();
  const [shipAddress, setShipAddress] = useState("");
  const [verifiedShipAddress, setVerifiedShipAddress] = useState();
  const [shippingFee, setShippingFee] = useState(0);
  const [shipFeeDiscount, setShipFeeDiscount] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(() => {
    let sum = 0;
    productList.forEach((product, index) => {
      if (isProductIndexesSelected[index]) {
        sum += product.price * product.quantity;
      }
    });
    return sum - shipFeeDiscount - productDiscount;
  });

  const [showVoucherWindow, setShowVoucherWindow] = useState(false);
  const voucherModalRef = useRef(null);

  useEffect(() => {
    getAllVouchers();
    getUserInformation();
  }, []);

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

  // function vndToDollar(num){
  //   console.log(Math.round((num / 25452) * 100) / 100)
  //   return Math.round((num / 25452) * 100) / 100;
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    let voucherList = [];
    //can't create order if ship address is invalid
    if (verifiedShipAddress === null) {
      alert("Ship address is invalid");
      return;
    }

    if (approvedProductVoucher != null) {
      voucherList.push(approvedProductVoucher);
    }

    if (approvedShippingVoucher != null) {
      voucherList.push(approvedShippingVoucher);
    }

    const jsonData = JSON.stringify({
      selectedProductLists: productList,
      voucherNames: voucherList,
      initialCost: totalPrice,
      finalCost: shippingFee - shipFeeDiscount + (totalPrice - productDiscount),
      fromAddress: shipAddress,
    });
    console.log(jsonData);

    try {
      const response = await fetchApi(
        process.env.REACT_APP_CREATE_ORDER_API + userData.userId,
        "POST",
        jsonData
      );

      const data = await response.json();
      if (data.status === 9999) {
        alert("Create an order successfully!");
        navigate("/cart");
      } else alert(data.payload);
    } catch (e) {
      alert("Failed to create an order!");
    }
  };

  async function getAllVouchers() {
    try {
      const response = await fetchApi(
        process.env.REACT_APP_GET_ALL_VOUCHERS,
        "GET"
      );

      if (response.status === 200) {
        const data = await response.json();
        setVoucherData(data);
        let sVouchers = [],
          psVouchers = [];
        data.forEach((voucher) => {
          if (voucher.type === "shipping") {
            sVouchers.push(voucher);
          } else {
            psVouchers.push(voucher);
          }
        });
        setShippingVouchers(sVouchers);
        setProductShopVouchers(psVouchers);
        //console.log(data);
        // alert("Create an order successfully!");
        // navigate("/cart");
      }
      //else alert(data.payload);
    } catch (e) {
      //alert("Failed to create an order!");
    }
  }

  async function getUserInformation() {
    try {
      const response = await fetchApi(
        process.env.REACT_APP_GET_USER_INFORMATION_API + userData.userId,
        "GET"
      );

      const data = await response.json();
      if (data.status === 9999) {
        setUserInformation(data.payload);
        if (data.payload.address != null) {
          setShipAddress(data.payload.address);
          getShippingFee(data.payload.address);
          setVerifiedShipAddress(data.payload.address);
        }
        //console.log(data.payload);
        // alert("Create an order successfully!");
        // navigate("/cart");
      }
      //else alert(data.payload);
    } catch (e) {
      //alert("Failed to create an order!");
    }
  }

  async function getShippingFee(address = shipAddress) {
    const jsonData = JSON.stringify({
      selectedProductLists: productList,
      voucherNames: [],
      fromAddress: address,
    });

    try {
      const response = await fetchApi(
        process.env.REACT_APP_GET_ORDER_SHIPPING_FEE_API + userData.userId,
        "POST",
        jsonData
      );

      const data = await response.json();
      if (data.status === 9999) {
        //setShippingFee(vndToDollar(data.payload));
        setShippingFee(data.payload);
      }
      //else alert(data.payload);
    } catch (e) {
      //alert("Failed to create an order!");
    }
  }

  async function sendApplyVoucherRequest(voucherName, type) {
    if (verifiedShipAddress === null) {
      alert("Must have a valid ship address first!");
      return;
    }

    const jsonData = JSON.stringify({
      selectedProductLists: productList,
      voucherNames: [voucherName],
      initialCost: totalPrice,
      shippingFee: shippingFee,
    });

    try {
      const response = await fetchApi(
        process.env.REACT_APP_APPLY_VOUCHER_API + userData.userId,
        "POST",
        jsonData
      );

      const data = await response.json();
      if (data.status === 9999) {
        if (type === "shipping") {
          setShipFeeDiscount(
            shippingFee - (data.payload.total - data.payload.subtotal)
          );
          setApprovedShippingVoucher(voucherName);
        } else {
          setProductDiscount(data.payload.total - data.payload.subtotal);
          setApprovedProductVoucher(voucherName);
        }
        alert("Apply voucher successfully");
      } else {
        alert("Can't use this voucher");
      }
    } catch (e) {
      alert("Can't use this voucher");
    }
  }

  return (
    <div>
      {/* <p>{JSON.stringify(productList)}</p> */}
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
                    <span style={{ marginRight: "1em" }}>Initial total: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(totalPrice)}
                    </span>
                  </div>
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
                    <span style={{ marginRight: "1em" }}>
                      Ship fee discount:{" "}
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(shipFeeDiscount)}
                    </span>
                  </div>
                  <div
                    className="text-end mb-1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ marginRight: "1em" }}>
                      Product discount:{" "}
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(productDiscount)}
                    </span>
                  </div>
                  <div
                    className="text-end mb-1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ marginRight: "1em" }}>Final Total: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {currencyFormat(
                        shippingFee -
                          shipFeeDiscount +
                          (totalPrice - productDiscount)
                      )}
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
                        defaultValue={shipAddress}
                        onChange={(e) => setShipAddress(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          console.log(shipAddress);
                          getShippingFee(shipAddress);
                        }}
                      >
                        Update shipping address
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">Vouchers</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                      <div className="row g-3">
                        <div className="col-md-12 form-group">
                          <label
                            for="productShopVoucher"
                            style={{ marginBottom: "0.5em" }}
                          >
                            Product/Shop voucher
                          </label>
                          <select
                            class="form-control"
                            id="productShopVoucher"
                            onChange={(e) =>
                              setSelectedProductVoucher(e.target.value)
                            }
                          >
                            <option></option>
                            {productShopVouchers.map((voucher) => {
                              return (
                                <option value={voucher.name}>
                                  {voucher.name +
                                    " - " +
                                    voucher.monetaryValue * 100 +
                                    "% off"}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              console.log(selectedProductVoucher);
                              sendApplyVoucherRequest(
                                selectedProductVoucher,
                                "product"
                              );
                            }}
                          >
                            Apply voucher
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12 mb-2">
                      <div className="row g-3">
                        <div className="col-md-12 form-group">
                          <label
                            for="productShopVoucher"
                            style={{ marginBottom: "0.5em" }}
                          >
                            Shipping voucher
                          </label>
                          <select
                            class="form-control"
                            id="shippingVoucher"
                            onChange={(e) => {
                              setSelectedShippingVoucher(e.target.value);
                              //console.log(e.target.value);
                            }}
                          >
                            <option></option>
                            {shippingVouchers.map((voucher) => {
                              return (
                                <option value={voucher.name}>
                                  {voucher.name +
                                    " - " +
                                    voucher.monetaryValue * 100 +
                                    "% off"}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              console.log(selectedShippingVoucher);
                              sendApplyVoucherRequest(
                                selectedShippingVoucher,
                                "shipping"
                              );
                            }}
                          >
                            Apply voucher
                          </button>
                        </div>
                      </div>
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
