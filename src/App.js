import { useContext } from 'react';
import './App.css';
import Page from './component/page.component';
import { SharedStateContext, SharedStateProvider } from './component/shared-state-context-api';
import { useSmoothScroll } from './share/hooks/smoothScroll.customHook';



function App() {
  return (
    <SharedStateProvider>
      <ThemedApp />
    </SharedStateProvider>
  );
}

function ThemedApp() {
  const { isDarkTheme, backgroundColor } = useContext(SharedStateContext);
  const scrollRef = useSmoothScroll();

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
      <Page />
    </div>
  );
}

export default App;
