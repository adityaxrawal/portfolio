import { useState, useCallback } from 'react';
import { Mail, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

// css
import './Header.css';
// context
import { useSharedState } from '@/app/providers/AppContext';
import Alert from '@/components/ui/Alert';
import { darkModeColorList, lightModeColorList, links } from '@/config';

const EMAIL_CHARS = Array.from('ar.adityarawal@gmail.com');

const Header = () => {
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
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
      <nav className={`nav-bar ${isDarkTheme ? 'theme-dark' : 'theme-light'}`}>
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

        {/* Center Section: Logo */}
        {/* <div className="nav-center">
          <div className="nav-logo-box">
            <Asterisk size={24} strokeWidth={2.5} />
          </div>
        </div> */}

        {/* Right Section: Socials + Theme Switch */}
        <div className="nav-right-group">
          <div className="nav-social-links">
            <a
              href={links.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </a>
            <a
              href={links.linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
            >
              <FaLinkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="#resume"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-link"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
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
      </nav>
    </>
  );
};

export default Header;
