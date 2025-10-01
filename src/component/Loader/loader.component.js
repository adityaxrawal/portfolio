import React from "react";
import "./loader.component.css";

const Loader = () => {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading awesome content...</p>
      <span className="sr-only">Loading, please wait</span>
    </div>
  );
};

export default React.memo(Loader);
