import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';
import { useState, useCallback } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

import { useSharedState } from '@/app';
import Alert from '@/components/ui/Alert';
import { darkModeColorList, lightModeColorList, links } from '@/config';
import { hoverSpring } from '@/lib/animations';

import './Header.css';

const EMAIL_CHARS = Array.from('ar.adityarawal@gmail.com');

const Header = () => {
  const [alert, setAlert] = useState<{ message: string; type: string }>({
    message: '',
    type: '',
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);
  const { isDarkTheme, setDarkTheme, setBackgroundColor } = useSharedState();

  const handleDarkMode = useCallback(() => {
    setDarkTheme(!isDarkTheme);
    setBackgroundColor(
      !isDarkTheme === true ? darkModeColorList[0] : lightModeColorList[0],
    );
  }, [isDarkTheme, setDarkTheme, setBackgroundColor]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('ar.adityarawal@gmail.com');
    setAlert((prevAlert) => ({
      ...prevAlert,
      message: 'Email copied to clipboard',
      type: 'success',
    }));
  }, []);

  return (
    <>
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => {
            setAlert({
              message: '',
              type: '',
            });
          }}
          duration={2500}
          theme={isDarkTheme ? 'dark' : 'light'}
        />
      )}
      <motion.nav
        className={`nav-bar ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Left Section: Email + Availability */}
        <div className="nav-left-group">
          <div
            className="nav-email-section"
            role="button"
            tabIndex={0}
            aria-label="Copy email address to clipboard"
            onClick={copyEmail}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyEmail();
              }
            }}
          >
            <Mail size={16} className="nav-icon" />
            <div className="email-animation-wrapper">
              <span className="sr-only">ar.adityarawal@gmail.com</span>
              <span className="animated-letters" aria-hidden="true">
                {EMAIL_CHARS.map((char, index) => (
                  <div
                    key={index}
                    className="cube-flip"
                    style={{ animationDelay: `${index * 10}ms` }}
                  >
                    {char}
                  </div>
                ))}
              </span>
              <span className="animated-letters" aria-hidden="true">
                {EMAIL_CHARS.map((char, index) => (
                  <div
                    key={index}
                    className="cube-flip"
                    style={{ animationDelay: `${index * 10}ms` }}
                  >
                    {char}
                  </div>
                ))}
              </span>
            </div>
          </div>

          <span className="nav-separator">•</span>

          <div className="nav-availability">
            <span>Available for select opportunities</span>
            <span className="availability-dot" />
          </div>
        </div>

        {/* Right Section: Socials + Theme Switch (desktop) */}
        <div className="nav-right-group nav-desktop-only">
          <div className="nav-social-links">
            <motion.a
              {...hoverSpring}
              href={links.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              {...hoverSpring}
              href={links.linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              {...hoverSpring}
              href="#resume"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
            >
              <FileText size={18} />
              <span>Resume</span>
            </motion.a>
          </div>

          <div className="nav-switch-wrapper">
            <label
              className="container-dark-mode"
              title={isDarkTheme ? 'Activate light mode' : 'Activate dark mode'}
              aria-label={
                isDarkTheme ? 'Activate light mode' : 'Activate dark mode'
              }
            >
              <input
                type="checkbox"
                checked={isDarkTheme}
                onChange={handleDarkMode}
              />
              <div />
            </label>
          </div>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className={`nav-hamburger ${menuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            className={`nav-mobile-menu ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}
          >
            <a
              href={links.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>
            <a
              href={links.linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="#resume"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
            <div className="nav-mobile-divider" />
            <div className="nav-mobile-theme-row">
              <span>Dark mode</span>
              <label
                className="container-dark-mode"
                title={
                  isDarkTheme ? 'Activate light mode' : 'Activate dark mode'
                }
                aria-label={
                  isDarkTheme ? 'Activate light mode' : 'Activate dark mode'
                }
              >
                <input
                  type="checkbox"
                  checked={isDarkTheme}
                  onChange={handleDarkMode}
                />
                <div />
              </label>
            </div>
          </div>
        )}
      </motion.nav>
    </>
  );
};

export default Header;
