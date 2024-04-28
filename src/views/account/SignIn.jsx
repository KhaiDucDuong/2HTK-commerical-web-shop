import { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchApi } from "../../hooks/useFetch"
const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const SignInView = ({setUser}) => {
  const navigate = useNavigate();
  const [loginFail, setLoginFail] = useState(false)

  const onSubmit = async (values) => {
    const jsonData = JSON.stringify({
      username: values.username,
      password: values.password
    })
    const response = await fetchApi(process.env.REACT_APP_SHOP_LOG_IN__API,
              "POST",
              jsonData)
  
    if (response.status === 200) {
      const data = await response.json()
      //console.log(data)
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data)
      navigate("/");
    }
    else{
      setLoginFail(true)
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
          <h4 className="text-center">Sign In</h4>
          <SignInForm onSubmit={onSubmit} loginFail={loginFail}/>
        </div>
      </div>
    </div>
  );
};

export default SignInView;
