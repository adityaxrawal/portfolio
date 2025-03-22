import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Page from './component/page.component';
import { AppProvider, useSharedState } from './context/app-context';
import { ReactLenis, useLenis } from 'lenis/react';
import tinycolor from 'tinycolor2';

function App() {
  return (
    <Router>
      <AppProvider>
        <ReactLenis root>
          <ThemedApp />
        </ReactLenis>
      </AppProvider>
    </Router>
  );
}

function ThemedApp() {
  const { isDarkTheme, backgroundColor } = useSharedState();

  useLenis(({ scroll }) => {
  });

  // Function to determine text color based on background brightness
  const getContrastColor = (bgColor) => {
    return tinycolor(bgColor).isDark() ? '#FFFFFF' : '#000000';
  };


  const themeStyles = {
    backgroundColor: backgroundColor,
    color: getContrastColor(backgroundColor), // Dynamically set text color
  };

  return (
    <div className="App" style={themeStyles}>
      <Routes>
        <Route path="/aditya-rawal" element={<Page />} />
        <Route path="/" element={<Navigate to="/aditya-rawal" replace />} />
      </Routes>
    </div>
  );
}

export default App;
