import { lazy, useState } from "react";
const LogInRequired = lazy(() => import("../pages/LogInRequired"));
const NoShopFoundError = lazy(() => import("../../components/shop/NoShopFoundError"));
const Search = lazy(() => import("../../components/Search"));
const ShopInfor = lazy(() => import("../../components/shop/ShopInfor"));
const ShopProduct = lazy(() => import("../../components/shop/ShopProduct"));
const SellerForm = lazy(() => import("../../components/sellerForm/SellerApplicationForm"));

const MyShopView = (props) => {
  const { userData } = props;
  const [hasShop, setHasShop] = useState(false);
  const onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };

  if (userData == null)
    return (
      <LogInRequired />
    );

  //fetch user's shop data

  //if user has a shop, display it; otherwise, shows a form to apply for seller
  return (
    <div>
      {!hasShop ? (
        //No shop found
        <NoShopFoundError />
      ) : (
        //shop
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ShopInfor />{" "}
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
