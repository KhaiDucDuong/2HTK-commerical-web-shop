import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { lazy, useState } from "react";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import { Field, reduxForm } from "redux-form";
import { required } from "../../helpers/validation";

const ShopInfor = (props) => {
  const {
    shopData,
    onSubmit,
    editingState,
    setEditingState,
    setSelectedForm,
    setFormData,
  } = props;
  const [selectedImgFile, setSelectedImgFile] = useState();
  const [shopNameForm, setShopNameForm] = useState(shopData.name);
  const [shopLocationForm, setShopLocationForm] = useState(shopData.address);
  const [shopDescriptionForm, setShopDescriptionForm] = useState(
    shopData.description
  );

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
    <form onSubmit={onSubmit}>
      <div className="row m-2">
        <div className="col-11">
          <table className="table table-bordered" style={{ width: "60vw" }}>
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
                <div
                  className="row mt-2"
                  style={{
                    width: 400,
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 0,
                    marginLeft: 0,
                  }}
                >
                  <div
                    className=""
                    style={{
                      width: 250,
                      display: "flex",
                      justifyContent: "start",
                      padding: 0,
                    }}
                  >
                    <input
                      type="file"
                      name="formFile"
                      className="form-control form-control-sm form-control-file"
                      id="shopImageFileForm"
                      accept="image/x-png,image/jpeg"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className=""
                    style={{
                      width: 100,
                      padding: 0,
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <button
                      type="submit"
                      class="btn btn-primary btn-sm"
                      onClick={() => setSelectedForm("SHOP_IMG")}
                    >
                      Update Img
                    </button>
                  </div>
                </div>
              </td>
              <td
                id="info-row"
                className="col-xs-8"
                colSpan="4"
                style={{ width: "60%", borderTop: "none" }}
              >
                {editingState ? (
                  <div className="">
                    <label for="shopNameInput" className="mb-2">
                      Name:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="shopName"
                      id="shopNameInput"
                      value={shopNameForm}
                      onChange={(e) => setShopNameForm(e.target.value)}
                    ></input>
                  </div>
                ) : (
                  <h2 className="user-name">{shopData.name}</h2>
                )}
              </td>
            </tr>
            {editingState ? (
              <>
                <tr>
                  <td id="info-row" className="col-xs-8" colSpan="4">
                    <div className="">
                      <label for="shopLocationInput" className="mb-2">
                        Location:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="shopLocation"
                        id="shopLocationInput"
                        value={shopLocationForm}
                        onChange={(e) => setShopLocationForm(e.target.value)}
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    id="info-row"
                    className="col-xs-8 borderless-top borderless-bottom"
                    colSpan="4"
                  >
                    <div className="">
                      <label for="shopDescriptionTextArea" className="mb-2">
                        Shop Description
                      </label>
                      <textarea
                        className="form-control"
                        name="shopDescriptionTextArea"
                        id="shopDescriptionTextArea"
                        rows={3}
                        value={shopDescriptionForm}
                        onChange={(e) => setShopDescriptionForm(e.target.value)}
                      ></textarea>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <>
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
                    <p className="user-infor" style={{whiteSpace: "pre-line"}}>{shopData.description}</p>
                  </td>
                </tr>
              </>
            )}

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
        <div className="col-1">
          {editingState ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-danger mt-2"
                onClick={() => setEditingState(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-success mt-2"
                onClick={() => {
                  setSelectedForm("SHOP_INFO");
                  setFormData(
                    [shopNameForm, shopLocationForm, shopDescriptionForm]
                  );
                }}
              >
                Save edit
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-primary mt-2"
              onClick={() => setEditingState(true)}
            >
              Edit shop
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ShopInfor;
