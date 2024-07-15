import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DataContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
      {children}
    </DataContext.Provider>
  );
};
