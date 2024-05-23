import { lazy, useEffect, useState } from "react";
import NoShopFoundError from "../../components/shop/NoShopFoundError";
import LogInRequired from "../pages/LogInRequired";
import { fetchApi } from "../../hooks/useFetch";
import { AllCategory } from "../../hooks/categoryApi";
import { reset } from "redux-form";
import NewProductForm from "../../components/shop/newProductForm";
import { Link, useNavigate } from "react-router-dom";

const AddProductView = (props) => {
  const { userData, userShop } = props;
  const [shopData, setShopData] = useState(userShop);
  const [categoryData, setCategoryData] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
    if (userShop == null) fetchUserShop();
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
        //console.log(data.payload);
      } else return <NoShopFoundError />;
      //setIsLoading(false);
      //console.log(data.payload);
    }
  };

  const fetchCategory = async () => {
    const category = await AllCategory();
    // console.log(category)
    setCategoryData(category);
  };

  const onSubmit = async (values, dispatch) => {
    //alert(JSON.stringify(values));
    //console.log(shopData)
    //console.log(JSON.stringify(values))
    //console.log(JSON.stringify(selectedCategories))
    let selectedCategoryIds = [];
    selectedCategories.map((category) =>
      selectedCategoryIds.push(category.value)
    );

    const jsonData = JSON.stringify({
      name: values.name,
      color: values.color != null ? values.color : "",
      size: values.size != null ? values.size : "",
      description: values.productDescription,
      remainQuantity: values.remainQuantity,
      price: values.price,
      shop_id: shopData._id,
      categoryIds: selectedCategoryIds,
    });
    console.log(jsonData);

    try {
      const response = await fetchApi(
        process.env.REACT_APP_CREATE_PRODUCT_API,
        "POST",
        jsonData
      );

      const data = await response.json();
      if (data.status === 9999) {
        setShopData(data.payload);
        //dispatch(reset("newProductForm"));
        alert("Add product successfully!");
        navigate("/account/shop")
      } else alert(data.payload);
    } catch (e) {
      alert("Failed to add product!");
    }
    // console.log(JSON.stringify({
    //   name: values.name,
    //   color: (values.color!=null ? values.color : ""),
    //   size: (values.size!=null ? values.size : ""),
    //   remainQuantity: values.remainQuantity,
    //   price: values.price,
    //   shop_id: shopData._id,
    //   categoryIds: selectedCategoryIds
    // }))
    // const jsonData = JSON.stringify({
    //   fromUser: userData.userId,
    //   name: values.name,
    //   phoneNumber: values.phoneNumber,
    //   email: values.email,
    //   applyingReason: values.applyingReason,
    //   businessPlanDescription: values.businessPlanDescription,
    //   images: [],
    // });
    // const response = await fetchApi(
    //   process.env.REACT_APP_ACCOUNT_CREATE_SELLER_APPLICATION_API,
    //   "POST",
    //   jsonData
    // );

    // if (response.status === 201) {
    //   const data = await response.json();
    //   console.log(data);
    //   setResponseData(data);
    //   dispatch(reset("sellerApplicationForm"));
    //   if (data.status === 999) {
    //     setFormSubmissionStatus(1);
    //   } else setFormSubmissionStatus(-2);
    // } else {
    //   setFormSubmissionStatus(-1);
    // }
  };

  // async function sendAddProductRequest()

  if (userData == null) return <LogInRequired />;

  return (
    <div className="container my-3">
      <div className="row g-3 d-flex justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header row g-3">
              <div className="col-sm-6">
                <i className="bi bi-box-seam-fill"></i> Add Product
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                {/* {selectedTab === "applicationList" && (
                  <Button
                    className=""
                    onClick={() => setSelectedTab("applicationForm")}
                  >
                    Create Seller Application
                  </Button>
                )}
                {selectedTab === "applicationForm" && (
                  <Button
                    className=""
                    onClick={() => setSelectedTab("applicationList")}
                  >
                    Go Back
                  </Button>
                )} */}
                <Link
                  type="button"
                  className="btn btn-sm btn-primary mt-2"
                  style={{
                    width: "100px",
                    fontWeight: "normal",
                    fontSize: "1.1em",
                  }}
                  to="/account/shop"
                >
                  Go Back
                </Link>
              </div>
            </div>
            <div className="card-body">
              {/* {selectedTab === "applicationList" && (
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Applying Reason</th>
                        <th scope="col" width={150}>
                          Apply Time
                        </th>
                        <th scope="col" width={150}>
                          Status
                        </th>
                        <th scope="col" className="text-end" width={130}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userSellerApplications.length > 0 &&
                        userSellerApplications.map((sellerApplication) => {
                          return (
                            <SellerAplicationRow
                              sellerApplication={sellerApplication}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )} */}
              <NewProductForm
                onSubmit={onSubmit}
                setSelectedCategories={setSelectedCategories}
                categoryData={categoryData}
                //   formSubmissionStatus={formSubmissionStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductView;
