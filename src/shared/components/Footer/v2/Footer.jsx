import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import ContactInfo from '../../../../features/contact/ContactInfo';
import { useSharedState } from '../../../context/AppContext';
import { links, THEME_COLORS } from '../../../utils/constants';
import './Footer.css';

const NEON = '#CCFF00';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkTheme } = useSharedState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // CSS custom properties drive all theme-dependent colors
  const themeVars = {
    // '--footer-bg': isDarkTheme ? THEME_COLORS.DARK_GRID : THEME_COLORS.DARK_TEXT,
    '--footer-text': isDarkTheme ? THEME_COLORS.DARK_TEXT : THEME_COLORS.DARK_GRID,
    '--footer-border': isDarkTheme ? THEME_COLORS.DARK_GRID : THEME_COLORS.LIGHT_GRID,
  };

  return (
    <>
      <footer className="footer-v2" style={themeVars}>
        {/* ── TOP BAR ── */}
        <div className="footer-v2__top-bar">
          {/* Left: CONTACT heading + neon pill button */}
          <div className="footer-v2__contact">
            <div className="footer-v2__contact-heading">
              <span>CONTACT</span>
              <span>ME</span>
              <span className="footer-v2__dash">—</span>
            </div>

            <button
              className="footer-v2__pill-btn"
              onClick={() => setIsModalOpen(true)}
              aria-label="Open contact form"
            >
              <span className="footer-v2__pill-btn-text">GET IN TOUCH</span>
              <span className="footer-v2__pill-arrow">→</span>
            </button>
          </div>

          {/* Right: Info (Copyright + Social) */}
          <div className="footer-v2__info">
            <div className="footer-v2__copyright">
              <p className="footer-v2__bottom-text">
                © {currentYear} adityarawal /
              </p>
              <p className="footer-v2__bottom-text">ALL RIGHTS RESERVED</p>
            </div>
            
            <div className="footer-v2__social-row">
              <a
                href={links.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-v2__social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={links.linkedInLink}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-v2__social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href={links.twitterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-v2__social-icon"
                aria-label="Twitter / X"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR (Hero Text) ── */}
        <div className="footer-v2__bottom-bar">
          <div className="footer-v2__hero-container">
            <span className="footer-v2__hero-text">LET&apos;S BUILD</span>
          </div>
        </div>
      </footer>

      {/* Contact modal — rendered outside footer to avoid overflow clipping */}
      <ContactInfo open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;
