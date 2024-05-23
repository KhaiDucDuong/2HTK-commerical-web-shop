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
  const [editingState, setEditingState] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState("SHOP_INFO"); //SHOP_IMG & SHOP_INFO
  const [formData, setFormData] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedForm === "SHOP_IMG") await sendUpdateImgRequest();
    else if (selectedForm === "SHOP_INFO") {
      //alert(formData[0] + " " + formData[1] + " " + formData[2])
      await sendUpdateShopInfoRequest(formData);
    }
  };

  async function sendUpdateImgRequest() {
    const formData = new FormData();
    const fileInput = document.querySelector("#shopImageFileForm");
    // console.log(document.querySelector("#shopImageFileForm"))
    // console.log(shopImageFile)
    if (fileInput.files[0] == null) {
      alert("Please upload an image!");
      return;
    }

    formData.append("image", fileInput.files[0]);
    // console.log(process.env.REACT_APP_UPDATE_SHOP_IMAGE_API + shopData._id)
    // console.log(formData)
    try {
      const response = await fetch(
        process.env.REACT_APP_UPDATE_SHOP_IMAGE_API + shopData._id,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === 9999) {
        setShopData(data.payload);
        alert("Shop image has been updated!");
      } else alert(data.payload);
    } catch (e) {
      alert("Failed to update shop image!");
    }
  }

  async function sendUpdateShopInfoRequest(values) {
    //console.log(values)
    const jsonData = JSON.stringify({
      name: values[0],
      address: values[1],
      description: values[2],
    });

    try {
      setEditingState(false);
      const response = await fetchApi(
        process.env.REACT_APP_UPDATE_SHOP_INFO_API + shopData._id,
        "PUT",
        jsonData
      );

      const data = await response.json();
      if (data.status === 9999) {
        setShopData(data.payload);
        alert("Shop Infomation has been updated!");
      } else alert(data.payload);
    } catch (e) {
      alert("Failed to update shop information!");
    }
  }

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
        console.log(data.payload);
      }
      setIsLoading(false);
      //console.log(data.payload);
    }
  };

  if (userData == null) return <LogInRequired />;

  if (isLoading)
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        Loading...
      </h1>
    );

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
          <div
            style={{ display: "flex", justifyContent: "center", minWidth: 50 }}
          >
            <ShopInfor
              shopData={shopData}
              onSubmit={onSubmit}
              editingState={editingState}
              setEditingState={setEditingState}
              setSelectedForm={setSelectedForm}
              setFormData={setFormData}
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
        </>
      )}
    </div>
  );
};

export default MyShopView;
