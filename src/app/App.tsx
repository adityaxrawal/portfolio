import { Analytics } from '@vercel/analytics/react';
import { Suspense, useCallback, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import tinycolor from 'tinycolor2';

import './App.css';

import { AppRoutes } from '@/config/routes';
import { AppProvider, useSharedState } from './providers/AppContext';
import AppUpdatePrompt from '@/components/ui/AppUpdatePrompt';
import EasterEgg from '@/components/ui/EasterEgg';
import Loader from '@/components/ui/Loader';
import { THEME_COLORS } from '@/config';
import { useKonamiCode } from '@/hooks';

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const triggerEasterEgg = useCallback(() => setShowEasterEgg(true), []);
  const handleEasterEggComplete = useCallback(
    () => setShowEasterEgg(false),
    [],
  );
  useKonamiCode(triggerEasterEgg);

  return (
    <Router>
      <AppProvider>
        <Analytics />
        {showEasterEgg && <EasterEgg onComplete={handleEasterEggComplete} />}
        <Suspense fallback={<Loader />}>
          <ThemedApp />
        </Suspense>
      </AppProvider>
    </Router>
  );
}

function ThemedApp() {
  const { backgroundColor } = useSharedState();

  const getContrastColor = (bgColor: string) => {
    if (!bgColor) return THEME_COLORS.DARK_GRID;
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
    <div className="App" style={appStyles}>
      <div className="grid-background" style={bgStyles} />
      <AppUpdatePrompt />
      <AppRoutes />
    </div>
  );
}

export default App;
