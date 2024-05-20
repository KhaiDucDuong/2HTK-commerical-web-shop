import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { lazy, useState } from "react";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import { Field, reduxForm } from "redux-form";
import { required } from "../../helpers/validation";

const ShopInfor = (props) => {
  const { shopData, onSubmit } = props;
  const [selectedImgFile, setSelectedImgFile] = useState();
  const [shopImgPath, setShopImagePath] = useState(
    shopData.image ? shopData.image : "../../images/NO_IMG.png"
  );

  function handleChange(e) {
    //console.log(e.target.files);
    if (e.target.files[0] != null) {
      setShopImagePath(URL.createObjectURL(e.target.files[0]));
      setSelectedImgFile(e.target.files[0]);
    }
  }

  return (
    <div className="">
      <table width="100%" className="table table-bordered">
        <tr>
          <td
            className="col-xs-4 user-img"
            rowSpan="4"
            style={{ borderBottom: "none", paddingRight: "30px" }}
          >
            <form onSubmit={onSubmit}>
              <img src={shopImgPath} style={{ width: 400, height: 400 }} />
              <div className="row mt-2">
                <div className="col-8">
                  <input
                    type="file"
                    name="formFile"
                    className="form-control form-control-sm form-control-file"
                    id="shopImageFileForm"
                    accept="image/x-png,image/jpeg"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div
                  className="col-4"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm"
                  >
                    Update Img
                  </button>
                </div>
              </div>
            </form>
          </td>

          <td id="info-row" className="col-xs-4" colSpan="2">
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
            colSpan="2"
          >
            <p className="user-infor">Shop Description</p>
            <p className="user-infor">{shopData.description}</p>
          </td>
        </tr>
        <tr>
          <td
            id="info-row"
            className="col-xs-4"
            colSpan="2"
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
            colSpan="2"
            style={{ borderBottom: "none" }}
          >
            <div className="">
              <span className="user-records">Products: 69</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ShopInfor;
