import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import { useState } from "react";
import { useEffect } from "react";
import AddProductView from "./views/shop/AddProductView";
//const Header = lazy(() => import("./components/Header"));
//const TopMenu = lazy(() => import("./components/TopMenu"));
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const ShopOrdersView = lazy(() => import("./views/account/ShopOrders"));
const MyOrdersView = lazy(()  => import("./views/account/MyOrders"))
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const SellerApplication = lazy(() =>
  import("./views/account/SellerApplication")
);
const MyShopView = lazy(() => import("./views/shop/MyShop"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const StarZoneView = lazy(() => import("./views/product/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const InvoiceView = lazy(() => import("./views/cart/Invoice"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));
const NotMyShopView = lazy(() => import("./views/shop/NotMyShop"));

function App() {
  const [user, setUser] = useState(null);
  const [userShop, setUserShop] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //console.log(userShop)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      //console.log(foundUser)
      setUser(foundUser);
      //console.log(userShop)
    }
    setIsLoading(false);
  }, []);

  return (
    <BrowserRouter>
      {!isLoading ? (
        <React.Fragment>
          <Header user={user} setUser={setUser} />
          <TopMenu />
          <Suspense
            fallback={
              <div className="text-white text-center mt-3">Loading...</div>
            }
          >
            <Routes>
              <Route exact path="/" element={<HomeView />} />
              <Route
                exact
                path="/account/signin"
                element={<SignInView setUser={setUser} />}
              />
              <Route exact path="/account/signup" element={<SignUpView />} />
              <Route
                exact
                path="/account/forgotpassword"
                element={<ForgotPasswordView />}
              />
              <Route
                exact
                path="/account/profile"
                element={<MyProfileView />}
              />
              <Route exact path="/shop" element={<NotMyShopView />} />
              <Route
                exact
                path="/account/shop"
                element={
                  <MyShopView userData={user} setUserShop={setUserShop} userShop={userShop} />
                }
              />
              <Route
                exact
                path="/account/shop/new"
                element={<AddProductView userData={user} userShop={userShop} />}
              />
              <Route exact path="/account/shop/orders" element={<ShopOrdersView userData={user} />} />
              <Route exact path="/account/orders" element={<MyOrdersView userData={user} />} />
              <Route
                exact
                path="/account/wishlist"
                element={<WishlistView />}
              />
              <Route
                exact
                path="/account/notification"
                element={<NotificationView />}
              />
              <Route
                exact
                path="/account/seller-application"
                element={<SellerApplication userData={user} />}
              />
              <Route
                exact
                path="/category"
                element={<ProductListView userData={user} />}
              />
              <Route
                exact
                path="/product/detail"
                element={
                  <ProductDetailView userData={user} userShop={userShop} />
                }
              />
              <Route exact path="/star/zone" element={<StarZoneView />} />
              <Route
                exact
                path="/cart"
                element={<CartView userData={user} />}
              />
              <Route exact path="/checkout" element={<CheckoutView />}/>
              <Route exact path="/invoice" element={<InvoiceView />} />
              <Route
                exact
                path="/documentation"
                element={<DocumentationView />}
              />
              <Route exact path="/contact-us" element={<ContactUsView />} />
              <Route exact path="/support" element={<SupportView />} />
              <Route exact path="/blog" element={<BlogView />} />
              <Route exact path="/blog/detail" element={<BlogDetailView />} />
              <Route exact path="/500" element={<InternalServerErrorView />} />
              <Route path="*" element={<NotFoundView />} />
              <Route path="/404" element={<NotFoundView />} />
            </Routes>
          </Suspense>
          <Footer />
        </React.Fragment>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
