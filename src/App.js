import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Page from './component/page.component';
import { AppProvider, useSharedState } from './context/app-context';

function App() {
  return (
    <Router>
      <AppProvider>
        <ThemedApp />
      </AppProvider>
    </Router>
  );
}

function ThemedApp() {
  const { isDarkTheme, backgroundColor } = useSharedState();
  const scrollRef = null;

  const darkTheme = {
    backgroundColor: backgroundColor,
    color: 'white'
  }

  const lightTheme = {
    backgroundColor: backgroundColor,
    color: 'black'
  }

  return (
    <div ref={scrollRef} className="App" style={isDarkTheme ? darkTheme : lightTheme}>
      {/* <span style={{position: 'sticky', top: 0, backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>current BCG: {backgroundColor}</span> */}
      <Routes>
        <Route path="/aditya-rawal" element={<Page />} />
        <Route path="/" element={<Navigate to="/aditya-rawal" replace />} />
      </Routes>
    </div>
  );
}

export default App;
