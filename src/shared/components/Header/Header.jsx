import React, { useState } from 'react';

// css
import './Header.css';
// context
import { darkModeColorList, lightModeColorList } from '../../utils/constants';
import { useSharedState } from '../../context/AppContext';
import Alert from '../Alert';

const Header = () => {
  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });
  const { isDarkTheme, setDarkTheme, setBackgroundColor } = useSharedState();

  const handleDarkMode = () => {
    setDarkTheme(!isDarkTheme);
    setBackgroundColor(
      !isDarkTheme === true ? darkModeColorList[0] : lightModeColorList[0],
    );
  };
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
      <nav className="nav-bar">
        <div
          className="nav-left"
          role="button"
          tabIndex="0"
          onClick={() => {
            navigator.clipboard.writeText('ar.adityarawal@gmail.com');
            setAlert((prevAlert) => ({
              ...prevAlert,
              message: 'Email copied to clipboard',
              type: 'success',
            }));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigator.clipboard.writeText('ar.adityarawal@gmail.com');
              setAlert((prevAlert) => ({
                ...prevAlert,
                message: 'Email copied to clipboard',
                type: 'success',
              }));
            }
          }}
        >
          <span className="animated-letters">
            {Array.from('ar.adityarawal@gmail.com').map((char, index) => (
              <div
                key={index}
                className="cube-flip"
                style={{ animationDelay: `${index * 10}ms` }}
              >
                {char}
              </div>
            ))}
          </span>
          <span className="animated-letters">
            {Array.from('ar.adityarawal@gmail.com').map((char, index) => (
              <div
                key={index}
                className="cube-flop"
                style={{ animationDelay: `${index * 10}ms` }}
              >
                {char}
              </div>
            ))}
          </span>
        </div>
        <div className="nav-right">
          <div className="nav-switch">
            <label
              className="container-dark-mode"
              title={isDarkTheme ? 'Activate light mode' : 'Activate dark mode'}
              aria-label={
                isDarkTheme ? 'Activate light mode' : 'Activate dark mode'
              }
            >
              <input
                type="checkbox"
                defaultChecked={isDarkTheme}
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
