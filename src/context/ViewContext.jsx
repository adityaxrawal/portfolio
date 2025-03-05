import React, { createContext, useContext, useState } from 'react';

const ViewContext = createContext(undefined);

export const ViewProvider = ({ children }) => {
  const [currentClassName, setCurrentClassName] = useState('');

  return (
    <ViewContext.Provider value={{ currentClassName, setCurrentClassName }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
}; 