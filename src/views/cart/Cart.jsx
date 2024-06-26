import React, { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartProduct from "../../components/cart/CartProduct";
import { fetchApi } from "../../hooks/useFetch";
import LogInRequired from "../pages/LogInRequired";
import { useNavigate, Navigate } from "react-router-dom";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const CartView = (props) => {
  const { userData } = props;
  const [cartId, setcartId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState();
  const [selectedProductId, setSelectedProductId] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [newProductQuantity, setNewProductQuantity] = useState();
  const [formAction, setFormAction] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    color: "",
    size: "",
  });

  const navigate = useNavigate();

  const handleCheckout = () => {
    // Chuyển hướng đến trang thanh toán và truyền danh sách sản phẩm đã chọn
  };

  useEffect(() => {
    try {
      fetchUserCart();
    } catch (e) {
      alert("Failed to load cart!");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formAction === "DELETE_PRODUCT_FROM_CART") {
      try {
        const responseData = await sendDeleteProductFromCartRequest(
          userData.userId,
          selectedProductId,
          selectedColor,
          selectedSize
        );

        if (responseData.status === 9999) {
          alert("Delete product from cart successfully!");
          fetchUserCart();
        } else {
          alert(responseData.payload);
        }
      } catch (e) {
        alert("Falied to delete product from cart!");
      }
    } else if (formAction === "UPDATE_PRODUCT_QUANTITY_IN_CART") {
      try {
        const responseData = await sendUpdateProductQuantityInCartRequest(
          userData.userId,
          selectedProductId,
          newProductQuantity,
          selectedColor,
          selectedSize
        );

        if (responseData.status === 9999) {
          alert("Update product quantity successfully!");
          fetchUserCart();
        } else {
          alert(responseData.payload);
        }
      } catch (e) {
        alert("Falied to update product quantity!");
      }
    }
  };

  const fetchUserCart = async () => {
    if (userData != null) {
      const response = await fetchApi(
        process.env.REACT_APP_SHOP_GET_CART_API + "/" + userData.userId,
        "GET"
      );
      const data = await response.json();
      if (data.status === 9999) {
        setcartId(data.payload.id);
        setCartProducts(data.payload.cart_products);
        setSelectedProducts(data.payload.cart_products);
        //console.log(data);
      }
      setIsLoading(false);
    }
  };

  const sendDeleteProductFromCartRequest = async (
    userId,
    productId,
    color,
    size
  ) => {
    const jsonData = JSON.stringify({
      productId: productId,
      color: color,
      size: size,
    });

    const response = await fetchApi(
      process.env.REACT_APP_DELETE_PRODUCT_FROM_CART_API + userId,
      "DELETE",
      jsonData
    );

    const data = await response.json();
    return data;
  };

  const sendUpdateProductQuantityInCartRequest = async (
    userId,
    productId,
    quantity,
    color,
    size
  ) => {
    const jsonData = JSON.stringify({
      productId: productId,
      quantity: quantity,
      color: color,
      size: size,
    });

    const response = await fetchApi(
      process.env.REACT_APP_UPDATE_PRODUCT_QUANTITY_CART_API + userId,
      "PUT",
      jsonData
    );

    const data = await response.json();
    return data;
  };

  if (userData == null) return <LogInRequired />;

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      {isLoading ? (
        <h1
          style={{
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          Loading...
        </h1>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="container mb-3">
            <div className="row">
              <div className="col-md-9">
                {cartId == null && <h1>No Cart found</h1>}
                {cartId != null && (
                  <div className="card">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <thead className="text-muted">
                          <tr className="small text-uppercase">
                            <th scope="col">Product</th>
                            <th scope="col" width={120}>
                              Quantity
                            </th>
                            <th scope="col" width={150}>
                              Price
                            </th>
                            <th
                              scope="col"
                              className="text-end"
                              width={130}
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartProducts.length === 0 ? (
                            <h3
                              style={{ marginLeft: "20px", marginTop: "10px" }}
                            >
                              Your cart is empty
                            </h3>
                          ) : (
                            cartProducts.map((product, index) => (
                              <CartProduct
                                key={product.id}
                                index={index}
                                product={product}
                                setSelectedProductId={setSelectedProductId}
                                setSelectedSize={setSelectedSize}
                                setSelectedColor={setSelectedColor}
                                setFormAction={setFormAction}
                                setNewProductQuantity={setNewProductQuantity}
                                selectedProducts={selectedProducts}
                                setSelectedProducts={setSelectedProducts}
                              />
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer">
                      <Link
                        className="btn btn-primary float-end"
                        to="/checkout"
                        state={{
                          cartProducts: selectedProducts,
                          userData: userData,
                          // .forEach(
                          //   (product, i) => {
                          //     if(selectedProducts[i])
                          //       return product;
                          //   }
                          // )
                        }}
                      >
                        Make Purchase <i className="bi bi-chevron-right"></i>
                      </Link>
                      <Link to="/" className="btn btn-secondary">
                        <i className="bi bi-chevron-left"></i> Continue shopping
                      </Link>
                    </div>
                  </div>
                )}
                {/* <div className="alert alert-success mt-3">
              <p className="m-0">
                <i className="bi bi-truck"></i> Free Delivery within 1-2 weeks
              </p>
            </div> */}
              </div>
              <div className="col-md-3">
                <div className="card mb-3">
                  <div className="card-body">
                    <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <dl className="row border-bottom">
                      <dt className="col-6">Total price:</dt>
                      <dd className="col-6 text-end">$1,568</dd>

                      <dt className="col-6 text-success">Discount:</dt>
                      <dd className="col-6 text-success text-end">-$58</dd>
                      <dt className="col-6 text-success">
                        Coupon:{" "}
                        <span className="small text-muted">EXAMPLECODE</span>{" "}
                      </dt>
                      <dd className="col-6 text-success text-end">-$68</dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-6">Total:</dt>
                      <dd className="col-6 text-end  h5">
                        <strong>$1,350</strong>
                      </dd>
                    </dl>
                    <hr />
                    <p className="text-center">
                      <img
                        src="../../images/payment/payments.webp"
                        alt="..."
                        height={26}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartView;
