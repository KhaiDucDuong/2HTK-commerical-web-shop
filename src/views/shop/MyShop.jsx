import { lazy, useState, useEffect } from "react";
import { fetchApi } from "../../hooks/useFetch";
const LogInRequired = lazy(() => import("../pages/LogInRequired"));
const NoShopFoundError = lazy(() =>
  import("../../components/shop/NoShopFoundError")
);
const Search = lazy(() => import("../../components/Search"));
const ShopInfor = lazy(() => import("../../components/shop/ShopInfor"));
const ShopProduct = lazy(() => import("../../components/shop/ShopProduct"));
const SellerForm = lazy(() =>
  import("../../components/sellerForm/SellerApplicationForm")
);

const MyShopView = (props) => {
  const { userData } = props;
  //const [hasShop, setHasShop] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };

  useEffect(() => {
    fetchUserShop();
  }, []);

  const fetchUserShop = async () => {
    if (userData != null) {
      const response = await fetchApi(
        process.env.REACT_APP_GET_USER_SHOP_API + userData.userId,
        "GET"
      );
      const data = await response.json();
      if (data.status === 9999) {
        setShopData(data.payload);
      }
      setIsLoading(false);
      //console.log(data.payload);
    }
  };

  if (userData == null) return <LogInRequired />;

  if (isLoading) return <h1>Loading...</h1>;

  //fetch user's shop data

  //if user has a shop, display it; otherwise, shows a form to apply for seller
  return (
    <div>
      {shopData == null ? (
        //No shop found
        <NoShopFoundError />
      ) : (
        //shop
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ShopInfor shopData={shopData} />{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <ShopProduct />
            <ShopProduct />
            <ShopProduct />
          </div>
        </>
      )}
    </div>
  );
};

export default MyShopView;
