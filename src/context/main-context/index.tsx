import React, { FC, PropsWithChildren, useContext, useState } from 'react';

const defaultContext = {
  dark: false,
};

// Context
const Context = React.createContext(defaultContext);
Context.displayName = 'AppContext';
// Context updater
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ContextUpdate = React.createContext(() => {});
Context.displayName = 'AppContextUpdate';

// custom hooks
const useAppContext = () => useContext(Context);
const useAppContextUpdate = () => useContext(ContextUpdate);

/* 
  React functional component that creates and returns a context, 
  that wraps around its child components 
*/
const AppContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(false);

  const toggleTheme = () => {
    setState(!state);
  };

  return (
    <Context.Provider value={{ dark: state }}>
      <ContextUpdate.Provider value={toggleTheme}>{children}</ContextUpdate.Provider>
    </Context.Provider>
  );
};

export default AppContext;
export { useAppContext, useAppContextUpdate };