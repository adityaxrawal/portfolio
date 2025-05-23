import React, { useEffect, useState } from "react";
import "./alert.component.css";

const Alert = ({ message, type = "info", onClose, duration = 3000 }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (closing) {
      const fadeOutTimer = setTimeout(() => {
        onClose(); // remove alert after fade-out
      }, 400); // match fadeOut duration
      return () => clearTimeout(fadeOutTimer);
    }
  }, [closing, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type} ${closing ? "fade-out" : ""}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={() => setClosing(true)}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
