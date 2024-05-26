import { Link, useLocation } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import { AllOrdersBySellers } from "../../hooks/OrderApi";
import { fetchUserShop } from "../../hooks/shopApi";
const LogInRequired = lazy(() => import("../pages/LogInRequired"));

const OrdersView = (props) => {
  const location = useLocation();
  const { shopData } = location.state || {};
  const [userShop, setUserShop] = useState(shopData!== undefined ? shopData : null)
  const { userData } = props;
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let shop = userShop;
      if(shop === null){
        shop = await fetchUserShopData()
      }

      try {
        console.log("2 " + shop)
        const response = await AllOrdersBySellers(shop._id); // Replace with actual userId or sellerId
        //console.log(userData.userId)
        setOrderProducts(response.payload); // Assuming `payload` contains the array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const fetchUserShopData = async () => {
    if (userData != null) {
      const responseData = await fetchUserShop(userData.userId);
      if (responseData.status === 9999) {
        //setShopData(responseData.payload);
        await setUserShop(responseData.payload);
        //console.log("1 " + responseData.payload)
        return responseData.payload
        //console.log(data.payload);
      }
    }
    return 1;
  };
  
  const getStatus = (statetusType) => {
    switch (statetusType) {
      case "1":
        return "WAITING";
      case "2":
        return "ACCEPTED";
      case "PENDING":
        return "badge bg-secondary";
      case "DELIVERED":
        return "badge bg-success";
      default:
        return { color: "black", fontSize: "1.2em" };
    }
  };

  if (userData == null) return <LogInRequired />;

  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>
      <div className="row g-3">
        {orderProducts.length === 0 && <h3>You don't have any order yet</h3>}
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
                        <span className="text-muted me-2">Product:</span>
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
