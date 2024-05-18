import { lazy } from "react";

const ShopInfor = (props) => {
  const { shopData } = props;
  const shopImgPath = "../../images/NO_IMG.png";
  if (shopData.image != null && (shopData.image.trim().length > 0)){
    shopImgPath = shopData.image
  }

  return (
    <div className="">
      <table width="100%" className="table table-bordered">
        <tr>
          <td className="col-xs-4 user-img" rowSpan="4">
            <img src={shopImgPath} />
          </td>

          <td id="info-row" className="col-xs-4" colSpan="1">
            <h2 className="user-name">{shopData.name}</h2>
          </td>
        </tr>
        <tr>
          <td id="info-row" className="col-xs-8" colSpan="2">
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
          <td id="info-row" className="col-xs-4" colSpan="1">
            <div className="">
              <span className="user-records">Liked: 44</span>
              <span className="lnr lnr-heart vector-symbol"></span>
            </div>
          </td>
          <td id="info-row" className="col-xs-4" colSpan="1">
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
