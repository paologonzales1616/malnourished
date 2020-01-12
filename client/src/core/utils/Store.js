import React, { createContext, useState } from "react";

export const AppContext = createContext({
  isOpen: true,
  isMobile: true,
  previousWidth: -1,
  page: "home"
});

const Store = ({ children }) => {
  const [app, setApp] = useState({
    isOpen: true,
    isMobile: true,
    previousWidth: -1,
    page: "home"
  });
  return (
    <AppContext.Provider value={{ app, setApp }}>
      {children}
    </AppContext.Provider>
  );
};

export default Store;
