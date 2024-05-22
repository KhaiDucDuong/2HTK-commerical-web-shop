import React from 'react';
import { useNavigate } from "react-router-dom";

const LogInRequired = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = "/account/signin"; 
    navigate(path);
  }

  return (
    <div className="container text-center p-5">
      <div className="display-1">
        <i className="bi bi bi-shield-lock text-warning" />
        403
      </div>
      <h1 className="mb-3">You must log in first!</h1>
      <div className="row justify-content-md-center m-4">
        <div className="col-md-6">
          <button onClick={routeChange} className="btn btn-primary mb-3">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default LogInRequired;
