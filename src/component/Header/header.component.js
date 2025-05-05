import React, { useState } from "react";
// css
import "./header.component.css";
// context
import {
  darkModeColorList,
  lightModeColorList,
} from "../../share/utils/constant";
import { useSharedState } from "../../context/app-context";
import Alert from "../Alert/alert.component";

const Header = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const { isDarkTheme, setDarkTheme, setBackgroundColor } = useSharedState();

  const handleDarkMode = () => {
    setDarkTheme(!isDarkTheme);
    setBackgroundColor(
      !isDarkTheme === true ? darkModeColorList[0] : lightModeColorList[0]
    );
  };
  return (
    <React.Fragment>
      {alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={()=>{
            setAlert({
              message: "",
              type: "",
              onClose: () => {},
            })
          }}
          duration={2500}
        />
      )}
      <nav className="nav-bar">
        <div
          className="nav-left"
          onClick={() => {
            navigator.clipboard.writeText("ar.adityarawal@gmail.com");
            setAlert((prevAlert) => (
              {
                ...prevAlert,
                message: "Email copied to clipboard",
                type: "success",
              }
            ));
          }}
        >
          <span className="animated-letters">
            {Array.from("ar.adityarawal@gmail.com").map((char, index) => (
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
            {Array.from("ar.adityarawal@gmail.com").map((char, index) => (
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
              title={isDarkTheme ? "Activate light mode" : "Activate dark mode"}
              aria-label={
                isDarkTheme ? "Activate light mode" : "Activate dark mode"
              }
            >
              <input
                type="checkbox"
                defaultChecked={false ? !isDarkTheme : isDarkTheme}
                onChange={handleDarkMode}
              />
              <div />
            </label>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
