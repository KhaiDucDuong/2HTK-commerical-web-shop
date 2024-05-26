import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { lazy, useState } from "react";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import { Field, reduxForm } from "redux-form";
import { required } from "../../helpers/validation";
import { Link } from "react-router-dom";

const ShopInfor = (props) => {
  const {
    shopData,
  } = props;
  const [shopImgPath, setShopImagePath] = useState(
    shopData.image ? shopData.image : "../../images/NO_IMG.png"
  );


  return (
      <div className="row m-2">
        <div className="col-10" style={{minWidth: "60vw"}}>
          <table className="table table-bordered">
            <tr>
              <td
                className="col-xs-4 user-img"
                rowSpan="4"
                style={{
                  borderBottom: "none",
                  borderTop: "none",
                  paddingRight: "30px",
                  width: "40%",
                }}
              >
                <img
                  src={shopImgPath}
                  style={{ width: 400, height: 400, padding: 0 }}
                />
              </td>
              <td
                id="info-row"
                className="col-xs-8"
                colSpan="4"
                style={{ width: "60%", borderTop: "none" }}
              >
                  <h2 className="user-name">{shopData.name}</h2>
              </td>
            </tr>
                <tr>
                  <td id="info-row" className="col-xs-8" colSpan="4">
                    <p className="user-email">Location: {shopData.address}</p>
                  </td>
                </tr>
                <tr>
                  <td
                    id="info-row"
                    className="col-xs-8 borderless-top borderless-bottom"
                    colSpan="4"
                  >
                    <p className="user-infor">Shop Description</p>
                    <p
                      className="user-infor"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {shopData.description}
                    </p>
                  </td>
                </tr>

            <tr>
              <td
                id="info-row"
                className="col-xs-4"
                colSpan="1"
                style={{ borderBottom: "none" }}
              >
                <div className="">
                  <span className="user-records">Liked: 44</span>
                  <span className="lnr lnr-heart vector-symbol"></span>
                </div>
              </td>
              <td
                id="info-row"
                className="col-xs-4"
                colSpan="1"
                style={{ borderBottom: "none" }}
              >
                <div className="">
                  <span className="user-records">Products: 69</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="col-1" style={{minWidth: "10vw"}}>
        </div>
      </div>
  );
};

export default ShopInfor;
