import React from 'react';
import { useNavigate } from "react-router-dom";

const NoShopFoundError = () => {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = "/account/seller-application"; 
      navigate(path);
    }
    
    return (
      <div className="container text-center p-5">
        <div className="display-1">
          <i className="bi bi bi-lock-fill text-warning" />
          428
        </div>
        <h1 className="mb-3">You must apply to become a seller first to own a shop!</h1>
        <div className="row justify-content-md-center m-4">
          <div className="col-md-6">
            <button onClick={routeChange} className="btn btn-primary mb-3">Apply for seller</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default NoShopFoundError;
  