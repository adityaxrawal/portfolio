import { useState } from 'react';

import './ContactButton.css';
import ContactInfo from '../../../../features/contact/ContactInfo';
import { useSharedState } from '../../../context/AppContext';

const ContactButton = ({
  children = 'Contact Me',
  className = '',
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme } = useSharedState();

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const buttonClasses = [
    'contact-button',
    `contact-button--${variant}`,
    `contact-button--${size}`,
    isDarkTheme ? 'contact-button--dark' : 'contact-button--light',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
