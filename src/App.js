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
import { getProfiles } from './apiServices/ProfileApi';

const App = () => {
  const [userProfile, setUserProfile] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  // get all issues
  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
  }, []);

  // get all profiles
  useEffect(() => {
    getProfiles()
      .then((data) => dispatch({ type: 'GET_PROFILES', data: data }))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (state.user) {
      const match = state.profiles.filter(
        (profile) => profile.userId === state.user.uid
      );
      dispatch({ type: 'CURRENT_PROFILE', data: match[0] });
      localStorage.setItem('profile', JSON.stringify(match[0]));
    }
  }, [state.user]);

  console.log(state.userProfile);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/issues/:id' element={<IssuePage />} />
          <Route path='/issues' element={<Issues />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profiles' element={<ProfilesTable />} />
          <Route path='/profiles/:id' element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
