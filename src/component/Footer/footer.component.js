import "./footer.component.css";
// App Context
import { useSharedState } from "../../context/app-context";
// SVG Component
import { DarkFooterSVG, LightFooterSVG } from "../../share/utils/svg";
// React Icons
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkTheme } = useSharedState();


  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDarkTheme ? "white" : "black",
        color: isDarkTheme ? "black" : "white",
      }}
    >
      <div className="footer-wave">
        {isDarkTheme === true ? (
          <DarkFooterSVG />
        ) : (
          <LightFooterSVG />
        )}
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
            <a
              href="mailto:ar.adityarawal@gmail.com"
              className="email-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
              style={{
                background: isDarkTheme? "black" : "white",
                border: isDarkTheme? "1px solid #000" : "1px solid #fff",
              }}
              >
                <span 
                className="button_top"
                style={{
                    color: isDarkTheme ? "black" : "white",
                    background: isDarkTheme ? "white" : 'black',
                    border: isDarkTheme ? "1px solid white" : "1px solid black",
                }}
                > Email Me </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
