import React, { useState } from "react";

const VoucherModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Danh sách các voucher (có thể truyền từ props)
  const voucherList = ["VOUCHER1", "VOUCHER2", "VOUCHER3"];

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div>
      {isVisible && (
        <div className="modal" style={styles.modal}>
          <div className="modal-content" style={styles.modalContent}>
            <span className="close" style={styles.close} onClick={handleCloseModal}>&times;</span>
            <h2>Danh sách voucher</h2>
            <ul>
              {voucherList.map((voucher, index) => (
                <li key={index}>{voucher}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Định nghĩa CSS bằng object
const styles = {
  modal: {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "#fefefe",
    margin: "15% auto",
    padding: 20,
    border: "1px solid #888",
    width: "80%"
  },
  close: {
    color: "#aaa",
    float: "right",
    fontSize: 28,
    fontWeight: "bold"
  }
};

export default VoucherModal;
