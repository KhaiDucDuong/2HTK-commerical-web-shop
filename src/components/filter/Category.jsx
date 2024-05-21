import React, { lazy, Component, useState,useEffect } from "react";
import {AllCategory} from "../../hooks/categoryApi"
import { Link } from "react-router-dom";

const FilterCategory= (props) => {
  const categoryList = props.data;
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
      {categoryList.length > 0 && categoryList.map((category, idx) => {
                    return (
        <li  key={idx} className="list-group-item">
        <a href={`/category?ID=${category._id}`} className="text-decoration-none stretched-link">
          {category.categoryName}
          </a>
        </li>
                    );
                  })}
      </ul>
    </div>
  );
};

export default FilterCategory;
