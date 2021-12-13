import React, { useEffect, useReducer } from 'react';
import { getIssues } from './apiServices/IssueApi';
import { AppContext } from './contextReducer/Context';
import { initialState } from './contextReducer/InitialState';
import reducer from './contextReducer/Reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      This is App component
    </AppContext.Provider>
  );
};

export default App;
