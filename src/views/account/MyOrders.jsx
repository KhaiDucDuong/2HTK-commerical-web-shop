import { Link, useLocation } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import { AllOrdersByUser } from "../../hooks/OrderApi";
import { fetchUserShop } from "../../hooks/shopApi";
const LogInRequired = lazy(() => import("../pages/LogInRequired"));

const MyOrdersView = (props) => {
  const { userData } = props;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userData != null) {
        try {
          console.log("fetching")
          const response = await AllOrdersByUser(userData.userId); // Replace with actual userId or sellerId
          //console.log(userData.userId)
          console.log(response.payload)
          setOrders(response.payload); // Assuming `payload` contains the array of orders
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, []);

  const getStatus = (statetusType) => {
    switch (statetusType) {
      case "1":
        return "WAITING";
      case "2":
        return "ACCEPTED";
      case "3":
        return "COMPLETED"
      default:
        return "WAITING";
    }
  };

  if (userData == null) return <LogInRequired />;

  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>
      <div className="row g-3">
        {orders.length === 0 && <h3>You don't have any order yet</h3>}
        {Array.isArray(orders) &&
          orders.map((order) => (
            <div className="col-md-6" key={order._id}>
              <div className="card">
                <div className="row g-0">
                  
                  <div className="col-md-12">
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
                      {order.productList &&
                        order.productList.map((product, index) => (
                          <div key={index} className="small">
                            <span className="text-muted me-2">Product:</span>
                            <span className="me-3">{product.productName}</span>
                            <span className="me-3">{product.size + product.color}</span>
                            <span className="text-muted me-2">Price:</span>
                            <span className="me-3">${product.price}</span>
                            <span className="text-muted me-2">Quantity:</span>
                            <span className="me-3">{product.quantity}</span>
                          </div>
                        ))}
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <div>
                        <span className="me-2">Status:</span>
                        <span
                          className={`text-${
                            order.status === 1 ? "warning" : "success"
                          }`}
                        >
                          <i
                            className={`bi bi-${
                              order.status === 1
                                ? "exclamation-circle-fill"
                                : "check-circle-fill"
                            } me-1`}
                          ></i>
                          {/* {order.status === 1 ? "Completed" : "Pending"} */}
                          {getStatus(order.status)}
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

export default MyOrdersView;
