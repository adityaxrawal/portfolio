import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import "./footer.component.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const waveRadius = 40;
  const waveDiameter = waveRadius * 2;
  const [svgWidth, setSvgWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSvgWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const numWaves = Math.ceil(svgWidth / waveDiameter);

  // U-shaped dip wave
  let pathD = `M 0 0 `;
  for (let i = 0; i < numWaves; i++) {
    pathD += `a ${waveRadius},${waveRadius} 0 0,0 ${waveRadius},${waveRadius} `;
    pathD += `a ${waveRadius},${waveRadius} 0 0,0 ${waveRadius},-${waveRadius} `;
  }
  pathD += `L ${svgWidth} 0`;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg
          viewBox={`0 0 ${svgWidth} ${waveRadius}`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d={pathD} className="wave-path" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <p className="motto">Let’s build something great together 🚀</p>
          <p className="copyright">© {currentYear} All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.github.com/adityaxrawal" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/adityaxrawal" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.x.com/adityaxrawal" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
