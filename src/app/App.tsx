// src/App.js
import { Suspense, useCallback, useState, lazy } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import tinycolor from 'tinycolor2';

import './App.css';

import AppUpdatePrompt from '@/components/AppUpdatePrompt';
import EasterEgg from '@/components/EasterEgg';
import Loader from '@/components/Loader';
import Page from '@/components/layout/PageLayout';
import { AppProvider, useSharedState } from '@/app/providers/AppContext';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { THEME_COLORS } from '@/constants';
const Companies = lazy(() => import('@/features/companies/Companies'));

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
        <Analytics />
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

  const getContrastColor = (bgColor: string) => {
    // Added check for undefined bgColor
    if (!bgColor) return THEME_COLORS.DARK_GRID; // Default to dark if undefined
    return tinycolor(bgColor).isDark()
      ? THEME_COLORS.DARK_TEXT
      : THEME_COLORS.DARK_GRID;
  };

  const appStyles = {
    color: getContrastColor(backgroundColor),
  };

  const bgStyles = {
    backgroundColor: backgroundColor,
    '--grid-color': tinycolor(backgroundColor).isDark()
      ? THEME_COLORS.DARK_GRID
      : THEME_COLORS.LIGHT_GRID,
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="App" style={appStyles}>
        <div className="grid-background" style={bgStyles} />
        <AppUpdatePrompt />
        <Routes>
          <Route path="/aditya-rawal" element={<Page />} />
          <Route path="/" element={<Navigate to="/aditya-rawal" replace />} />
          {/* Full immersive scroll-driven love letter page */}
          {/* <Route path="/my-love-bhavi" element={<MyLoveBhavi />} /> */}
          {/* Keep companies route if needed */}
          {/* <Route path='/companies' element={<Companies/>}/> */}
          <Route path="/companies" element={<Companies />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
