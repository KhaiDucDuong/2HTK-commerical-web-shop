import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AllOrdersBySellers } from "../../hooks/OrderApi";

const OrdersView = (props) => {
  const { userData } = props;
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AllOrdersBySellers("6648210594a14d0d75586fe9"); // Replace with actual userId or sellerId
        setOrderProducts(response.payload); // Assuming `payload` contains the array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>
      <div className="row g-3">
        {Array.isArray(orderProducts) && orderProducts.map((order) => (
          <div className="col-md-6" key={order._id}>
            <div className="card">
              <div className="row g-0">
                <div className="col-md-3 text-center">
                  {/* Assuming you have a placeholder image */}
                  <img
                    src={"../../images/products/tshirt_red_480x400.webp"}
                    className="img-fluid"
                    alt="Product"
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-header">
                    <div className="small">
                      <span className="border bg-secondary rounded-left px-2 text-white">
                        Order ID
                      </span>
                      <span className="border bg-white rounded-right px-2 me-2">
                        #{order._id}
                      </span>
                      <span className="border bg-secondary rounded-left px-2 text-white">
                        Date
                      </span>
                      <span className="border bg-white rounded-right px-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6>
                      <Link to="/" className="text-decoration-none">
                        Order Details
                      </Link>
                    </h6>
                    {order.productList && order.productList.map((product, index) => (
                      <div key={index} className="small">
                        <span className="text-muted me-2">Product ID:</span>
                        <span className="me-3">{product.productId}</span>
                        <span className="text-muted me-2">Size:</span>
                        <span className="me-3">{product.size}</span>
                        <span className="text-muted me-2">Price:</span>
                        <span className="me-3">${product.price}</span>
                        <span className="text-muted me-2">Color:</span>
                        <span className="me-3">{product.color}</span>
                        <span className="text-muted me-2">Quantity:</span>
                        <span className="me-3">{product.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <div>
                      <span className="me-2">Status:</span>
                      <span className={`text-${order.status === 1 ? 'success' : 'danger'}`}>
                        <i className={`bi bi-${order.status === 1 ? 'check-circle-fill' : 'exclamation-circle-fill'} me-1`}></i>
                        {order.status === 1 ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div>
                      <span className="me-2">Invoice:</span>
                      <span className="text-success">
                        <Link to="/invoice">
                          <i className="bi bi-receipt-cutoff me-1"></i>
                          Download
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
