// Modal.js

import React from 'react';
import '../styles/Modal.css';

const Modal = ({ children, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
