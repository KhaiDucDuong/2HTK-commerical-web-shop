import { lazy, useState, useEffect } from "react";
import { GetShopDetailbyID } from "../../hooks/shopApi";
import "../../App.css";
const LogInRequired = lazy(() => import("../pages/LogInRequired"));
const Search = lazy(() => import("../../components/Search"));
const ShopInfor = lazy(() => import("../../components/shop/NotMyShopinfor"));

const ShopProduct = lazy(() => import("../../components/shop/ShopProduct"));
const SellerForm = lazy(() =>
  import("../../components/sellerForm/SellerApplicationForm")
);

const MyShopView = (props) => {
  const { userData } = props;
  //const [hasShop, setHasShop] = useState(false);
  const [editingState, setEditingState] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState("SHOP_INFO"); //SHOP_IMG & SHOP_INFO
  const [formData, setFormData] = useState();
  let queryParameters = new URLSearchParams(window.location.search);
  let shopID = queryParameters.get("id");
  const fetchUserShopData = async () => {
      const responseData = await GetShopDetailbyID(shopID);
      if (responseData.status === 9999) {
        setShopData(responseData.payload);
        //setUserShop(responseData.payload);
        //console.log(responseData.payload);
      }
      setIsLoading(false);
  };
  useEffect(() => {
    
    //console.log(shopData)
    //if (shopData == null)
    fetchUserShopData();
    
  }, []);
  
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
          <div
            style={{ display: "flex", justifyContent: "center", minWidth: 50 }}
          >
            <ShopInfor
              shopData={shopData}
            />{" "}
          </div>

          <div className="row" style={{margin: "50px"}}>
            {shopData.products.length === 0 && (
              <h2
                className="text-bold col-12"
                style={{textAlign: "center" }}
              >
                No products yet...
              </h2>
            )}
            {shopData.products.map((product, idx) => {
              return (
                <div key={idx} className="col-xl-3 col-lg-4 col-md-6 col-12" style={{ display: "flex", justifyContent: "center" }}>
                  <ShopProduct product={product} />
                </div>
              );
            })}
          </div>

          {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          </div> */}
    </div>
  );
};

export default MyShopView;
