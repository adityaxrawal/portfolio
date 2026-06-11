import { Analytics } from '@vercel/analytics/react';
import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import tinycolor from 'tinycolor2';

import './App.css';

import { AppProvider, useSharedState } from './providers/AppContext';
import { LoadingProvider, useLoading } from './providers/LoadingContext';

import AppUpdatePrompt from '@/components/ui/AppUpdatePrompt';
import EasterEgg from '@/components/ui/EasterEgg';
import GlobalErrorFallback from '@/components/ui/GlobalErrorFallback';
import Loader from '@/components/ui/Loader';
import { THEME_COLORS } from '@/config';
import { AppRoutes } from '@/config/routes';
import { useKonamiCode } from '@/hooks';
import { useFontsReady } from '@/hooks/useFontsReady';

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
      <LoadingProvider>
        <AppProvider>
          <Analytics />
          {showEasterEgg && <EasterEgg onComplete={handleEasterEggComplete} />}
          <ThemedApp />
        </AppProvider>
      </LoadingProvider>
    </Router>
  );
}

function ThemedApp() {
  const { backgroundColor, isDarkTheme } = useSharedState();

  // ── Sync .dark class on <html> for CSS custom properties + Tailwind v4 dark: ──
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
    try {
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    } catch {
      console.warn('LocalStorage is not available');
    }
  }, [isDarkTheme]);

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

  // Font readiness hook
  useFontsReady();
  const { isAppReady } = useLoading();

  return (
    <div className="App" style={appStyles}>
      <div className="grid-background" style={bgStyles} />
      <AppUpdatePrompt />
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <AppRoutes />
        {/* Global initial loader */}
        <Loader isFullScreen={true} isAppReady={isAppReady} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
