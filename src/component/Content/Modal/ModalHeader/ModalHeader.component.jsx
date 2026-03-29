import React from "react";
import "./ModalHeader.css";

const ModalHeader = React.memo(({ title, onClose, showBackButton, onBack }) => (
  <div className="modal-header">
    {showBackButton ? (
      <button
        type="button"
        className="back-button"
        onClick={onBack}
        aria-label="Go back to options"
      >
        ← Back
      </button>
    ) : (
      <div className="back-button-placeholder"></div>
    )}
    <h2 id="contact-title">{title}</h2>
    <button
      type="button"
      className="close-button"
      onClick={onClose}
      aria-label="Close modal"
    >
      {"×"}
    </button>
  </div>
));

ModalHeader.displayName = "ModalHeader";

export default ModalHeader;
