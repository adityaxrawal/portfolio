/**
 * @deprecated Use `ContactButton/v2` instead.
 */
import { useState, MouseEvent } from 'react';

import './ContactButton.css';
import { useSharedState } from '@/app';
import { ContactInfo } from '@/features/contact';

export interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | string;
  size?: 'small' | 'medium' | 'large' | string;
}

const ContactButton = ({
  children = 'Contact Me',
  className = '',
  variant = 'primary',
  size = 'medium',
  ...props
}: ContactButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme } = useSharedState();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
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
