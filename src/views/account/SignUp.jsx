import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../../hooks/useFetch"
const SignUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = () => {
  const [responseData, setResponseData] = useState(null)
  const [signUpFail, setSignUpFail] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const onSubmit = async (values) => {
    console.log(values.firstName)
    const jsonData = JSON.stringify({
      fullName: values.firstName + " " + values.lastName,
      username: values.username,
      password: values.password
    })
    const response = await fetchApi(process.env.REACT_APP_SHOP_REGISTER_API,
              "POST",
              jsonData)

    const data = await response.json()
    //console.log(data)
    if (data.status === 9999) {
      setResponseData(data)
      setSignUpSuccess(true)
      setSignUpFail(false)
    }
    else{
      setSignUpFail(true)
      setSignUpSuccess(false)
    }
  };
  return (
    <div className="container my-3">
      <div className="row border">
        <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
          <Link to="/">
            <img
              src="../../images/banner/Dell.webp"
              alt="..."
              className="img-fluid"
            />
          </Link>
          <Link to="/">
            <img
              src="../../images/banner/Laptops.webp"
              alt="..."
              className="img-fluid"
            />
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Sign Up</h4>
          <SignUpForm onSubmit={onSubmit} signUpFail={signUpFail} signUpSuccess={signUpSuccess} />
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
