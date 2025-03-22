import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Page from './component/page.component';
import { AppProvider, useSharedState } from './context/app-context';
import { ReactLenis, useLenis } from 'lenis/react';

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

  const themeStyles = {
    backgroundColor: backgroundColor,
    color: isDarkTheme ? 'white' : 'black',
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
