import { lazy, useEffect, useState } from "react";
import LogInRequired from "../pages/LogInRequired";
import { fetchApi } from "../../hooks/useFetch";
import { reset } from "redux-form";
import { Button } from "react-bootstrap";
const SellerAplicationForm = lazy(() =>
  import("../../components/sellerForm/SellerApplicationForm")
);

const SellerApplicationView = (props) => {
  const { userData } = props;

  const [responseData, setResponseData] = useState(null);
  //0 - show nothing
  //1 - creating a seller application successfully,
  //-1 - failed to create a seller application
  //-2 - user isn't allowed to send another seller application
  const [formSubmissionStatus, setFormSubmissionStatus] = useState(0);
  //the list of seller applications the logged in user has created
  const [userSellerApplications, setUserSellerApplications] = useState([]);

  //fetch user's seller applications data on page reload
  useEffect(() => {
    if (userData != null) {
    }
  }, []);

  const onSubmit = async (values, dispatch) => {
    //alert(JSON.stringify(values));

    const jsonData = JSON.stringify({
      fromUser: userData.userId,
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email,
      applyingReason: values.applyingReason,
      businessPlanDescription: values.businessPlanDescription,
      images: [],
    });
    const response = await fetchApi(
      process.env.REACT_APP_ACCOUNT_CREATE_SELLER_APPLICATION_API,
      "POST",
      jsonData
    );

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      setResponseData(data);
      dispatch(reset("sellerApplicationForm"));
      if (data.status === 999) {
        setFormSubmissionStatus(1);
      } else setFormSubmissionStatus(-2);
    } else {
      setFormSubmissionStatus(-1);
    }
  };

  if (userData == null) return <LogInRequired />;

  return (
    <div className="container my-3">
      <div className="row g-3">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header row g-3">
              <div className="col-sm-6">
                <i className="bi bi-briefcase"></i> Seller Application
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                <Button className="">Create Seller Application</Button>
              </div>
            </div>
            <div className="card-body">
              <SellerAplicationForm
                onSubmit={onSubmit}
                formSubmissionStatus={formSubmissionStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerApplicationView;
