// src/App.js
import React, { useState, useCallback, Suspense, lazy } from 'react';
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
import { THEME_COLORS } from './shared/utils/constants';
import { useKonamiCode } from './shared/hooks/useKonamiCode';
import EasterEgg from './shared/components/EasterEgg';
import Loader from './shared/components/Loader';
import MyLoveBhavi from './features/bu/BU';

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
    if (!bgColor) return THEME_COLORS.DARK; // Default to black if undefined
    return tinycolor(bgColor).isDark() ? '#FFFFFF' : THEME_COLORS.DARK;
  };

  const appStyles = {
    color: getContrastColor(backgroundColor),
  };

  const bgStyles = {
    backgroundColor: backgroundColor,
    '--grid-color': tinycolor(backgroundColor).isDark()
      ? THEME_COLORS.DARK
      : THEME_COLORS.LIGHT,
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="App" style={appStyles}>
        <div className="grid-background" style={bgStyles} />
        <Routes>
          <Route path="/aditya-rawal" element={<Page />} />
          <Route path="/" element={<Navigate to="/aditya-rawal" replace />} />
          {/* Full immersive scroll-driven love letter page */}
          {/* <Route path="/my-love-bhavi" element={<MyLoveBhavi />} /> */}
          {/* Keep companies route if needed */}
          {/* <Route path='/companies' element={<Companies/>}/> */}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
