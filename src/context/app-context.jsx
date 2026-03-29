import { createContext, useContext, useState } from 'react';
import { darkModeColorList } from '../share/utils/constant';

// Create contexts
export const SharedStateContext = createContext();
export const ViewContext = createContext(undefined);

// Initial values
const initialBackgroundColor = darkModeColorList[0];

// Combined provider component
export const AppProvider = ({ children }) => {
    const [isDarkTheme, setDarkTheme] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor);
    const [currentClassName, setCurrentClassName] = useState('');

    return (
        <SharedStateContext.Provider value={{ isDarkTheme, setDarkTheme, backgroundColor, setBackgroundColor }}>
            <ViewContext.Provider value={{ currentClassName, setCurrentClassName }}>
                {children}
            </ViewContext.Provider>
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