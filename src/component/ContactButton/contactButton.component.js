import React, { useState } from "react";
import "./contactButton.component.css";
import ContactInfo from "../Content/Modal/contactInfo.component";
import { useSharedState } from "../../context/app-context";

const ContactButton = ({
  children = "Contact Me",
  className = "",
  variant = "primary",
  size = "medium",
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme } = useSharedState();

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const buttonClasses = [
    "contact-button",
    `contact-button--${variant}`,
    `contact-button--${size}`,
    isDarkTheme ? "contact-button--dark" : "contact-button--light",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button className={buttonClasses} onClick={handleClick} {...props}>
        <span className="contact-button__text">{children}</span>
      </button>

      <ContactInfo open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ContactButton;
