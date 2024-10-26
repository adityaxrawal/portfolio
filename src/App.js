import { useContext } from 'react';
import './App.css';
import Page from './component/page.component';
import { SharedStateContext, SharedStateProvider } from './component/shared-state-context-api';

const darkTheme = {
  backgroundColor: 'black',
  color: 'white'
}

const lightTheme = {
  backgroundColor: 'white',
  color: 'black'
}

function App() {
  return (
    <SharedStateProvider>
      <ThemedApp />
    </SharedStateProvider>
  );
}

function ThemedApp() {
  const { isDarkTheme } = useContext(SharedStateContext);

  return (
    <div className="App" style={isDarkTheme ? darkTheme : lightTheme}>
        <Page />
    </div>
  );
}

export default App;
