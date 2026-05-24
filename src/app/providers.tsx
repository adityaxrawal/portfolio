import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

import { lightModeColorList } from '@/config';

interface SharedState {
  isDarkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
}

interface ViewState {
  currentClassName: string;
  setCurrentClassName: (value: string) => void;
}

// Create contexts
export const SharedStateContext = createContext<SharedState | undefined>(
  undefined,
);
export const ViewContext = createContext<ViewState | undefined>(undefined);

// Initial values
const initialBackgroundColor = lightModeColorList[0];

interface AppProviderProps {
  children: ReactNode;
}

// Combined provider component
export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor,
  );
  const [currentClassName, setCurrentClassName] = useState('');

  const sharedStateValue = useMemo(
    () => ({ isDarkTheme, setDarkTheme, backgroundColor, setBackgroundColor }),
    [isDarkTheme, backgroundColor],
  );

  const viewValue = useMemo(
    () => ({ currentClassName, setCurrentClassName }),
    [currentClassName],
  );

  return (
    <SharedStateContext.Provider value={sharedStateValue}>
      <ViewContext.Provider value={viewValue}>{children}</ViewContext.Provider>
    </SharedStateContext.Provider>
  );
};

// Custom hooks
export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within an AppProvider');
  }
  return context;
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within an AppProvider');
  }
  return context;
};
