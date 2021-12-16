import React, { useEffect, useReducer, useState } from 'react';
import { getIssues } from './apiServices/IssueApi';
import LoginPage from './components/Login/index';
import IssuePage from './components/IssuePage/IssuePage';
import Profile from './components/Profile/Profile';
import { AppContext } from './contextReducer/Context';
import { initialState } from './contextReducer/InitialState';
import reducer from './contextReducer/Reducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Issues from './components/Issues/Issues';
import ProfilesTable from './components/Profile/ProfilesTable/ProfilesTable';
import Employee from './components/Profile/Employee/Employee';

const App = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [error, setError] = useState(true);

  // if (profile.userId === state.user._id) {
  // } else {
  //   setErrorMsg('you need to login to do that');
  // }

  const [state, dispatch] = useReducer(reducer, initialState);
  // get all issues
  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
    setErrorMsg('You not belong here');
  }, []);

  // console.log(state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/issues/:id' element={<IssuePage />} />
          <Route path='/issues' element={<Issues />} />
          <Route path='/profile' element={<Profile />} />
          {error ? (
            <Route path='/profiles' element={<ProfilesTable />} />
          ) : (
            <p>{errorMsg}</p>
          )}

          <Route path='/profiles/:id' element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
