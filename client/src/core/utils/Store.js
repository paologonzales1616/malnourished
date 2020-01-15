import React, { createContext, useState } from "react";

export const AppContext = createContext({
  isOpen: true,
  isMobile: true,
  previousWidth: -1,
  page: "home"
});

export const BrgyContext = createContext(0);

const Store = ({ children }) => {
  const [brgy, setBrgy] = useState(0);
  const [app, setApp] = useState({
    isOpen: true,
    isMobile: true,
    previousWidth: -1,
    page: "home"
  });
  return (
    <AppContext.Provider value={{ app, setApp }}>
      <BrgyContext.Provider value={{ brgy, setBrgy }}>
        {children}
      </BrgyContext.Provider>
    </AppContext.Provider>
  );
};

export default Store;
