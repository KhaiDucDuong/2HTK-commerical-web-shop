import React, { lazy, Component, useState } from "react";
import { useEffect } from "react";
import {fetchApi} from "../../hooks/useFetch";
import {AllProducts} from "../../hooks/productApi"
import {findProducts} from "../../hooks/productApi"
import {findProductsByCategory} from "../../hooks/productApi"
import {AllCategory} from "../../hooks/categoryApi"
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);



function ProductListView() {
  const [productList, setProductList] = useState([]);
  const [categoryList,setCategoryList] = useState([]);
  let queryParameters = new URLSearchParams(window.location.search)
  let productName = queryParameters.get("search")
  let productCategory = queryParameters.get("ID")
  useEffect(() => {
      const fetchDataAll = async () => {
          const products = await AllProducts();
          setProductList(products);
      };
      const fetchDataName = async (name) => {
          const products = await findProducts(name);
          setProductList(products);
      };
      const fetchDataCategory = async (name) => {
        const products = await findProductsByCategory(name);
        setProductList(products);
    };
      const fetchCategory = async() => {
        const category = await AllCategory();
        setCategoryList(category);
      };
      if (productName != null && productCategory == null){
        fetchDataName(productName);
      }
      if(productCategory != null) {
        fetchDataCategory(productCategory);
      }
      if(productName == null && productCategory == null) {
        fetchDataAll();
      }
      fetchCategory();
  }, []);
    return (
      <>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
            All products
            </span>
          </div>
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory data={categoryList} />
              <FilterPrice />
              <FilterSize />
              <FilterStar />
              <FilterColor />
              <FilterClear />
              <FilterTag />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {/* {this.state.totalItems} results for{" "} */}
                    <span className="text-warning">Seaching for: {productName}</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={4}>Price high to low</option>
                  </select>
                  {/* <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div> */}
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {/* {productList.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })} */}
                {productList.length > 0 && productList.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={product} />
                      </div>
                    );
                  })}
              </div>
              <hr />
              
              {/* <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              /> */}
            </div>
          </div>
        </div>
        </>
    );
  }

export default ProductListView;
