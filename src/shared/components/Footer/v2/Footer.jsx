import './Footer.css';
// App Context
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useSharedState } from '../../../context/AppContext';
import { THEME_COLORS } from '../../../utils/constants';

// ContactInfo Modal
import ContactButton from '../../ContactButton/v2';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkTheme } = useSharedState();

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDarkTheme ? THEME_COLORS.LIGHT : THEME_COLORS.DARK,
        color: isDarkTheme ? THEME_COLORS.DARK : THEME_COLORS.LIGHT,
      }}
    >
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
            <ContactButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
