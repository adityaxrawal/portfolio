/**
 * @deprecated Use `Footer/v2` instead.
 */
import { useState } from 'react';

// App Context
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { useSharedState } from '@/app';
import { DarkFooterSVG, LightFooterSVG } from '@/components/ui/Icons';
import { THEME_COLORS } from '@/config';
// SVG Component
// React Icons
// ContactInfo Modal
import { ContactInfo } from '@/features/contact';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkTheme } = useSharedState();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDarkTheme
          ? THEME_COLORS.DARK_TEXT
          : THEME_COLORS.DARK_GRID,
        color: isDarkTheme ? THEME_COLORS.DARK_GRID : THEME_COLORS.DARK_TEXT,
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
              aria-label="Visit My GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/adityaxrawal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with me on LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.x.com/adityaxrawal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow me on X (Twitter)"
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
                background: isDarkTheme
                  ? THEME_COLORS.DARK_GRID
                  : THEME_COLORS.DARK_TEXT,
                border: isDarkTheme
                  ? `1px solid ${THEME_COLORS.DARK_GRID}`
                  : `1px solid ${THEME_COLORS.DARK_TEXT}`,
              }}
            >
              <span
                className="button_top"
                style={{
                  color: isDarkTheme
                    ? THEME_COLORS.DARK_GRID
                    : THEME_COLORS.DARK_TEXT,
                  background: isDarkTheme
                    ? THEME_COLORS.DARK_TEXT
                    : THEME_COLORS.DARK_GRID,
                  border: isDarkTheme
                    ? `1px solid ${THEME_COLORS.DARK_TEXT}`
                    : `1px solid ${THEME_COLORS.DARK_GRID}`,
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
