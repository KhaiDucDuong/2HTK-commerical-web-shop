import { lazy } from "react";
const Search = lazy(() => import("../../components/Search"));
const ShopInfor  = lazy(() => import("../../components/shop/ShopInfor"));
const ShopProduct  = lazy(() => import("../../components/shop/ShopProduct"));

const MyShopView = () => {
    return(
        <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ShopInfor /> </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <ShopProduct />
        <ShopProduct />
        <ShopProduct />
      </div>
        </div>
    )
};

export default MyShopView;
