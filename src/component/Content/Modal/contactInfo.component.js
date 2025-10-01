import React, { useCallback, useEffect } from "react";
import "./contactInfo.component.css";
import { useSharedState } from "../../../context/app-context";
import { links } from "../../../share/utils/constant";

const ContactInfo = ({ open, onClose }) => {
  const { isDarkTheme } = useSharedState();

  // Handle ESC key press to close modal
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="contact-modal-backdrop" onClick={handleBackdropClick}>
      <div
        className={`contact-info-modal ${isDarkTheme ? "dark" : "light"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <div className="modal-header">
          <h2 id="contact-title">Get In Touch</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          <p>Let's connect and discuss opportunities!</p>

          <div className="contact-options">
            <a
              href={`mailto:${links.email || "contact@adityarawal.dev"}`}
              className="contact-option email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">📧</span>
              <span>Email Me</span>
            </a>

            <a
              href={links.linkedInLink}
              className="contact-option linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">💼</span>
              <span>LinkedIn</span>
            </a>

            <a
              href={links.githubLink}
              className="contact-option github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">🐙</span>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
