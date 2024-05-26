import { lazy, useState, useEffect } from "react";
import { data } from "../../data";
import { Link } from "react-router-dom";
import {
  GetProductByID,
  sendAddProductToCartRequest,
  sendUpdateProductImgRequest,
} from "../../hooks/productApi";
import { GetShopbyID, fetchUserShop } from "../../hooks/shopApi";
import "../../App.css";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));

function ProductDetailView(props) {
  const { userData, userShop } = props;
  let queryParameters = new URLSearchParams(window.location.search);
  let productID = queryParameters.get("product");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [userShopId, setUserShopId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState();
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [editingState, setEditingState] = useState(false);
  const [shopImgPath, setShopImagePath] = useState("../../images/NO_IMG.png");
  const [selectedForm, setSelectedForm] = useState(); //UPDATE_PRODUCT_IMG & UPDATE_PRODUCT_INFO & ADD_PRODUCT_VARIATION & ADD_PRODUCT_TO_CART & ADD_PRODUCT_TO_WISHLIST
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    const fetchShopName = async (ID) => {
      let datashop = await GetShopbyID(ID);
      setShop(datashop);
    };

    const fetchUseruserShopData = async () => {
      if (userData != null) {
        const responseData = await fetchUserShop(userData.userId);
        if (responseData.status === 9999) {
          setUserShopId(responseData.payload._id);
          //setUserShop(responseData.payload);
          //console.log(data.payload);
        }
        //setIsLoading(false);
        //console.log(data.payload);
      }
    };

    const fetchProduct = async (proID) => {
      let data = await GetProductByID(proID);
      setProduct(data);
      setSelectedVariation(
        data.productVariations[0].size + "_" + data.productVariations[0].color
      );
      setShopImagePath(
        data.productVariations[selectedVariationIndex].image
          ? data.productVariations[selectedVariationIndex].image
          : "../../images/NO_IMG.png"
      );
      if (data && data.shopId) {
        await fetchShopName(data.shopId.toString());
      }
      setLoading(false);
    };

    if (productID) {
      fetchProduct(productID);
      fetchUseruserShopData();
    }
  }, [productID]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (!product || !product.productVariations) {
    return <div>No product found</div>;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedForm === "UPDATE_PRODUCT_IMG") {
      const responseData = await sendUpdateProductImgRequest(
        product._id,
        product.productVariations[selectedVariationIndex].color,
        product.productVariations[selectedVariationIndex].size,
        "productImageFileInput"
      );
      if (responseData.status === 9999) {
        setProduct(responseData.payload);
        alert("Product image has been updated!");
      } else alert(data.payload);
    } else if (selectedForm === "UPDATE_PRODUCT_INFO") {
    } else if (selectedForm === "ADD_PRODUCT_VARIATION") {
    } else if (selectedForm === "ADD_PRODUCT_TO_CART") {
      try {
        const responseData = await sendAddProductToCartRequest(
          userData.userId,
          product._id,
          productQuantity,
          product.productVariations[selectedVariationIndex].color,
          product.productVariations[selectedVariationIndex].size
        );

        if (responseData.status === 9999) {
          alert("Add product to cart successfully!");
        } else {
          alert(responseData.payload);
        }
      } catch (e) {
        alert("Falied to add product to cart!");
      }
    } else if (selectedForm === "ADD_PRODUCT_TO_WISHLIST") {
    }
  };

  function handleFileInputChange(e) {
    //console.log(e.target.files);
    if (e.target.files[0] != null) {
      setShopImagePath(URL.createObjectURL(e.target.files[0]));
      //setSelectedImgFile(e.target.files[0]);
    }
  }

  return (
    <div className="container-fluid mt-3">
      {/* <h1>{JSON.stringify(product)}</h1> */}
      {/* <h1>{shop._id === userShopId ? "OWNER" : "FOREIGNER"}</h1> */}
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <img
                  src={`${shopImgPath}`}
                  className="img-fluid mb-3"
                  alt=""
                  style={{ width: "25vw", height: "25vw" }}
                />
                {editingState && (
                  <div
                    className="row"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      marginLeft: 0,
                    }}
                  >
                    <div
                      className="col-7"
                      style={{
                        //width: "15vw",
                        display: "flex",
                        justifyContent: "start",
                        padding: 0,
                      }}
                    >
                      <input
                        type="file"
                        name="formFile"
                        className="form-control form-control-sm form-control-file"
                        id="productImageFileInput"
                        accept="image/x-png,image/jpeg"
                        onChange={handleFileInputChange}
                      />
                    </div>
                    <div
                      className="col-5"
                      style={{
                        //width: "7vw",
                        //minWidth: "fit-content",
                        padding: 0,
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <button
                        type="submit"
                        class="btn btn-primary btn-sm"
                        onClick={() => setSelectedForm("UPDATE_PRODUCT_IMG")}
                      >
                        Update Img
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-9">
                    <h1 className="h5 d-inline me-2">{product.name}</h1>
                    <span className="badge bg-success me-2">New</span>
                    <div>
                      <p>
                        Shop:{" "}
                        <Link
                          to={`/product/detail?product=${product._id}`}
                          className="text-decoration-none"
                        >
                          {shop.name}
                        </Link>
                      </p>
                    </div>
                    <div className="mb-3">
                      <i className="bi bi-star-fill text-warning me-1" />
                      <i className="bi bi-star-fill text-warning me-1" />
                      <i className="bi bi-star-fill text-warning me-1" />
                      <i className="bi bi-star-fill text-warning me-1" />
                      <i className="bi bi-star-fill text-secondary me-1" />|{" "}
                      <span className="text-muted small">
                        42 ratings and 4 reviews
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-3"
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                    }}
                  >
                    {shop._id === userShopId && editingState && (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mt-2"
                          style={{ width: "100%" }}
                          onClick={() => setEditingState(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-sm btn-success mt-2"
                          style={{ width: "100%" }}
                        >
                          Save
                        </button>
                      </>
                    )}
                    {shop._id === userShopId && !editingState && (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mt-2"
                          style={{ width: "100%" }}
                          onClick={() => setEditingState(true)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* <span className="badge bg-danger me-2">Hot</span> */}
                <dl className="row small mb-3">
                  <dt className="col-sm-3">Availability</dt>
                  <dd className="col-sm-9">
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                  </dd>
                  <dt className="col-sm-3">Sold by</dt>
                  <dd className="col-sm-9">Authorised Store</dd>
                  <dt className="col-sm-3">Variation</dt>
                  {/* <h3>{JSON.stringify(product.productVariations)}</h3> */}
                  <dd className="col-sm-9">
                    {product.productVariations.map((variation, index) => {
                      return (
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={variation.size + "_" + variation.color}
                            value={index}
                            key={index}
                            checked={
                              variation.size + "_" + variation.color ===
                              selectedVariation
                            }
                            onChange={(e) => {
                              setSelectedVariation(
                                product.productVariations[e.target.value].size +
                                  "_" +
                                  product.productVariations[e.target.value]
                                    .color
                              );
                              setSelectedVariationIndex(e.target.value);
                              setShopImagePath(
                                product.productVariations[e.target.value].image
                                  ? product.productVariations[e.target.value]
                                      .image
                                  : "../../images/NO_IMG.png"
                              );
                              //console.log(e.target)
                            }}
                            id="size_color_input"
                          />
                          <label
                            className="form-check-label"
                            htmlFor={index}
                            value={index}
                            key={index}
                          >
                            {variation.size + " " + variation.color}
                          </label>
                        </div>
                      );
                    })}
                    {/* <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizem"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="sizem">
                      M
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizel"
                    />
                    <label className="form-check-label" htmlFor="sizel">
                      L
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizexl"
                    />
                    <label className="form-check-label" htmlFor="sizexl">
                      XL
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="size"
                      id="sizexxl"
                    />
                    <label className="form-check-label" htmlFor="sizexxl">
                      XXL
                    </label>
                  </div> */}
                  </dd>
                  {/* <dt className="col-sm-3">Color</dt>
                <dd className="col-sm-9">
                  <button className="btn btn-sm btn-primary p-2 me-2"></button>
                  <button className="btn btn-sm btn-secondary p-2 me-2"></button>
                  <button className="btn btn-sm btn-success p-2 me-2"></button>
                  <button className="btn btn-sm btn-danger p-2 me-2"></button>
                  <button className="btn btn-sm btn-warning p-2 me-2"></button>
                  <button className="btn btn-sm btn-info p-2 me-2"></button>
                  <button className="btn btn-sm btn-dark p-2 me-2"></button>
                </dd> */}
                </dl>

                <div className="mb-3">
                  <span className="fw-bold h5 me-2">
                    ${product.productVariations[selectedVariationIndex].price}
                  </span>
                  {/* <del className="small text-muted me-2">$2000</del>
                <span className="rounded p-1 bg-warning  me-2 small">
                  -$100
                </span> */}
                </div>
                <div className="mb-3">
                  <div className="d-inline float-start me-2">
                    <div className="input-group input-group-sm mw-140">
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => {
                          if (productQuantity > 1)
                            setProductQuantity(productQuantity - 1);
                        }}
                      >
                        <i className="bi bi-dash-lg"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                      />
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={() => {
                          if (productQuantity < 99)
                            setProductQuantity(productQuantity + 1);
                        }}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary me-2"
                    title="Add to cart"
                    onClick={() => setSelectedForm("ADD_PRODUCT_TO_CART")}
                  >
                    <i className="bi bi-cart-plus me-1"></i>Add to cart
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-warning me-2"
                    title="Buy now"
                  >
                    <i className="bi bi-cart3 me-1"></i>Buy now
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    title="Add to wishlist"
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                </div>
                <div>
                  <p className="fw-bold mb-2 small">Product Highlights</p>
                  <ul className="small">
                    <li>Rating by customers: {product.averageRating}</li>
                    <li>
                      {" "}
                      Quantity remain:{" "}
                      {
                        product.productVariations[selectedVariationIndex]
                          .remainQuantity
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-link active"
                      id="nav-details-tab"
                      data-bs-toggle="tab"
                      href="#nav-details"
                      role="tab"
                      aria-controls="nav-details"
                      aria-selected="true"
                    >
                      Details
                    </a>
                    <a
                      className="nav-link"
                      id="nav-randr-tab"
                      data-bs-toggle="tab"
                      href="#nav-randr"
                      role="tab"
                      aria-controls="nav-randr"
                      aria-selected="false"
                    >
                      Ratings & Reviews
                    </a>
                    <a
                      className="nav-link"
                      id="nav-faq-tab"
                      data-bs-toggle="tab"
                      href="#nav-faq"
                      role="tab"
                      aria-controls="nav-faq"
                      aria-selected="false"
                    >
                      Questions and Answers
                    </a>
                    <a
                      className="nav-link"
                      id="nav-ship-returns-tab"
                      data-bs-toggle="tab"
                      href="#nav-ship-returns"
                      role="tab"
                      aria-controls="nav-ship-returns"
                      aria-selected="false"
                    >
                      Shipping & Returns
                    </a>
                    <a
                      className="nav-link"
                      id="nav-size-chart-tab"
                      data-bs-toggle="tab"
                      href="#nav-size-chart"
                      role="tab"
                      aria-controls="nav-size-chart"
                      aria-selected="false"
                    >
                      Size Chart
                    </a>
                  </div>
                </nav>
                <div className="tab-content p-3 small" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-details"
                    role="tabpanel"
                    aria-labelledby="nav-details-tab"
                  >
                    <p style={{ whiteSpace: "pre-line" }}>
                      {product.description}
                    </p>
                    {/* <Details data={product.description} /> */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-randr"
                    role="tabpanel"
                    aria-labelledby="nav-randr-tab"
                  >
                    {Array.from({ length: 5 }, (_, key) => (
                      <RatingsReviews key={key} />
                    ))}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-faq"
                    role="tabpanel"
                    aria-labelledby="nav-faq-tab"
                  >
                    <dl>
                      {Array.from({ length: 5 }, (_, key) => (
                        <QuestionAnswer key={key} />
                      ))}
                    </dl>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-ship-returns"
                    role="tabpanel"
                    aria-labelledby="nav-ship-returns-tab"
                  >
                    <ShippingReturns />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-size-chart"
                    role="tabpanel"
                    aria-labelledby="nav-size-chart-tab"
                  >
                    <SizeChart />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <CardFeaturedProduct data={data.products} />
          <CardServices />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailView;
