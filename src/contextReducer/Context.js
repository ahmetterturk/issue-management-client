import React, { useContext } from 'react';

// crete app context with creteContext
export const AppContext = React.createContext();

// using custom hook for globalstate
export const useGlobalContext = () => {
  return useContext(AppContext);
};
