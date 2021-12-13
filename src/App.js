import React, { useReducer } from 'react';
import { AppContext } from './contextReducer/Context';
import { initialState } from './contextReducer/InitialState';
import reducer from './contextReducer/Reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      some components
    </AppContext.Provider>
  );
};

export default App;
