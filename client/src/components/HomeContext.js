import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const DataProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('lifeScience'); 

  return (
    <HomeContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </HomeContext.Provider>
  );
};
