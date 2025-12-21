import React, { createContext, useState } from 'react';

const AppContext = createContext({});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [setupConfig, setSetupConfig] = useState({});

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
