import { useState, MouseEvent } from 'react';

import './ContactButton.css';
import { useSharedState } from '@/app/providers/AppContext';
import ContactInfo from '@/features/contact/ContactInfo';

export interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const ContactButton = ({
  children = 'Contact Me',
  className = '',
  ...props
}: ContactButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme } = useSharedState();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
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
