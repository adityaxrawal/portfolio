import { useState } from 'react';
import './Footer.css';
// App Context
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { useSharedState } from '../../context/AppContext';
// SVG Component
import { DarkFooterSVG, LightFooterSVG } from '../../utils/svg';
// React Icons
// ContactInfo Modal
import ContactInfo from '../../../features/contact/components/ContactInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkTheme } = useSharedState();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDarkTheme ? 'white' : 'black',
        color: isDarkTheme ? 'black' : 'white',
      }}
    >
      <div className="footer-wave">
        {isDarkTheme === true ? <DarkFooterSVG /> : <LightFooterSVG />}
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <p className="motto">Let’s build something great together 🚀</p>
          <p className="copyright">© {currentYear} All rights reserved.</p>
          <div className="social-links">
            <a
              href="https://www.github.com/adityaxrawal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/adityaxrawal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.x.com/adityaxrawal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div className="email-me">
            <button
              className="contact-button"
              onClick={() => setIsContactModalOpen(true)}
              style={{
                background: isDarkTheme ? 'black' : 'white',
                border: isDarkTheme ? '1px solid #000' : '1px solid #fff',
              }}
            >
              <span
                className="button_top"
                style={{
                  color: isDarkTheme ? 'black' : 'white',
                  background: isDarkTheme ? 'white' : 'black',
                  border: isDarkTheme ? '1px solid white' : '1px solid black',
                }}
              >
                Contact Me
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info Modal */}
      <ContactInfo
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
