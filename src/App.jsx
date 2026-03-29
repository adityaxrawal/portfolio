// src/App.js
import React, { useState, useCallback, Suspense } from "react"; // Import useState, useCallback
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Page from "./component/page.component";
import { AppProvider, useSharedState } from "./context/app-context";
import { ReactLenis, useLenis } from "lenis/react";
import tinycolor from "tinycolor2";
import { useKonamiCode } from "./hooks/useKonamiCode.hook";
import EasterEgg from "./component/EasterEgg/easter-egg.component";
import Loader from "./component/Loader/loader.component";
// Import Easter Egg components and hook

// Keep Companies import if you still use the route, otherwise remove
// import Companies from './component/Companies/companies.component';

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Callback function to trigger Easter egg
  const triggerEasterEgg = useCallback(() => {
    setShowEasterEgg(true);
  }, []);

  // Attach the Konami code listener
  useKonamiCode(triggerEasterEgg);

  // Callback to hide Easter egg after it finishes
  const handleEasterEggComplete = () => {
    setShowEasterEgg(false);
  };

  return (
    <Router>
      <AppProvider>
        {/* Render Easter Egg conditionally */}
        {showEasterEgg && <EasterEgg onComplete={handleEasterEggComplete} />}
        <ReactLenis root>
          <ThemedApp />
        </ReactLenis>
      </AppProvider>
    </Router>
  );
}

// Keep ThemedApp function as is
function ThemedApp() {
  const { backgroundColor } = useSharedState(); // isDarkTheme removed if not used directly here

  // Lenis usage remains the same
  useLenis(({ scroll }) => {});

  const getContrastColor = (bgColor) => {
    // Added check for undefined bgColor
    if (!bgColor) return "#000000"; // Default to black if undefined
    return tinycolor(bgColor).isDark() ? "#FFFFFF" : "#000000";
  };

  const themeStyles = {
    backgroundColor: backgroundColor,
    color: getContrastColor(backgroundColor),
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="App" style={themeStyles}>
        <Routes>
          <Route path="/aditya-rawal" element={<Page />} />
          <Route path="/" element={<Navigate to="/aditya-rawal" replace />} />
          {/* Keep companies route if needed */}
          {/* <Route path='/companies' element={<Companies/>}/> */}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
