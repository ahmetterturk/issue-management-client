import React, { useContext } from 'react';

export const AppContext = React.createContext();

// using custom hook for globalstate
export const useGlobalContext = () => {
  return useContext(AppContext);
};
