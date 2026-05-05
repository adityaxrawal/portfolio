import { useState } from 'react';

import './ContactButton.css';
import ContactInfo from '../../../../features/contact/ContactInfo';
import { useSharedState } from '../../../context/AppContext';

const ContactButton = ({
  children = 'Contact Me',
  className = '',
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme } = useSharedState();

  const handleClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const buttonClasses = [
    'contact-button-v2',
    isDarkTheme ? 'contact-button-v2--dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <button className={buttonClasses} onClick={handleClick} {...props}>
        {children}
      </button>

      <ContactInfo open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ContactButton;
