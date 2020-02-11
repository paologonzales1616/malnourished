import React, { createContext, useState } from "react";

export const AppContext = createContext({
  isOpen: true,
  isMobile: true,
  previousWidth: -1,
  page: "home"
});
export const UserContext = createContext({
  loggedIn: false
});
export const BrgyContext = createContext(0);
export const DateContext = createContext(new Date().getFullYear().toString());
const Store = ({ children }) => {
  const [brgy, setBrgy] = useState(0);
  const [app, setApp] = useState({
    isOpen: true,
    isMobile: true,
    previousWidth: -1,
    page: "home"
  });
  const [date, setDate] = useState(new Date().getFullYear().toString());
  const [user, setUser] = useState({
    loggedIn: false
  });
  return (
    <AppContext.Provider value={{ app, setApp }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrgyContext.Provider value={{ brgy, setBrgy }}>
          <DateContext.Provider value={{ date, setDate }}>
            {children}
          </DateContext.Provider>
        </BrgyContext.Provider>
      </UserContext.Provider>
    </AppContext.Provider>
  );
};

export default Store;
