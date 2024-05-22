import { Link } from "react-router-dom";

const SellerAplicationRow = (props) => {
  const { rowOnClick, sellerApplication } = props;
  const applyTime = new Date(sellerApplication.createdAt);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Bangkok",
  };
  const displayApplyTime = new Intl.DateTimeFormat("vi-VN", options).format(
    applyTime
  );

  return (
    <tr>
      <td style={{ maxWidth: "30vw" }}>
        <div>
          {/* <div className="col-3 d-none d-md-block">
            <img
              src=""
              width="80"
              alt="..."
            />
          </div> */}
          <div
            style={{
              height: "100px",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {sellerApplication.applyingReason}
          </div>
        </div>
      </td>
      <td>
        <div className="input-group input-group-sm mw-140">
          {displayApplyTime.toString()}
        </div>
      </td>
      <td>
        <var className="price"> {sellerApplication.approveStatus} </var>
      </td>
      <td className="text-end">
        <button className="btn btn-sm btn-outline-secondary me-2">
          <i className="bi bi-heart-fill"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default SellerAplicationRow;
