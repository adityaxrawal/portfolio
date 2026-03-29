// src/App.js
import React, { useState, useCallback, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import { ReactLenis, useLenis } from 'lenis/react';
import tinycolor from 'tinycolor2';

import Page from './shared/components/PageLayout';
import { AppProvider, useSharedState } from './shared/context/AppContext';
import { useKonamiCode } from './shared/hooks/useKonamiCode';
import EasterEgg from './shared/components/EasterEgg';
import Loader from './shared/components/Loader';
// Import Easter Egg components and hook

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const triggerEasterEgg = useCallback(() => setShowEasterEgg(true), []);
  useKonamiCode(triggerEasterEgg);
  const handleEasterEggComplete = useCallback(
    () => setShowEasterEgg(false),
    [],
  );

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
  const { backgroundColor } = useSharedState();

  // Lenis usage remains the same
  useLenis();

  const getContrastColor = (bgColor) => {
    // Added check for undefined bgColor
    if (!bgColor) return '#000000'; // Default to black if undefined
    return tinycolor(bgColor).isDark() ? '#FFFFFF' : '#000000';
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
