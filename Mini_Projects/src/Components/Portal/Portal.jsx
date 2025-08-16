import React, { useState } from "react";
import Modal from "./Modal";
import "./style.css";

const Portal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="portal-container">
      <h1 className="portal-title">Portal Demo</h1>
      <button className="open-modal-btn" onClick={openModal}>
        Mở Modal
      </button>
      <Modal isShow={showModal} onClose={closeModal}>
        <div className="modal-sample-content">
          <h2>Portal Modal</h2>
          <p>Đây là một modal đơn giản sử dụng React Portals.</p>

          <div className="modal-actions">
            <button
              className="modal-btn modal-btn-primary"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Portal;
