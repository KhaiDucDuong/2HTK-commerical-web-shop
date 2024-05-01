import { lazy, useEffect, useState } from "react";
import LogInRequired from "../pages/LogInRequired";
import { fetchApi } from "../../hooks/useFetch";
import { reset } from "redux-form";
import { Button } from "react-bootstrap";
import SellerAplicationRow from "../../components/sellerForm/SellerApplicationRow";
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
    fetchUserSellerApplications();
  }, []);

  const fetchUserSellerApplications = async () => {
    if (userData != null) {
      const response = await fetchApi(
        process.env.REACT_APP_ACCOUNT_GET_USER_SELLER_APPLICATIONS_API +
          userData.userId,
        "GET"
      );
      const data = await response.json();
      setUserSellerApplications(data);
      console.log(data)
    }
  };

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
      <div className="row g-3 d-flex justify-content-center">
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
              {/* <SellerAplicationForm
                onSubmit={onSubmit}
                formSubmissionStatus={formSubmissionStatus}
              /> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerApplicationView;
