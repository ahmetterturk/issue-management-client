import React, { useEffect, useReducer } from 'react';
import Box from '@mui/material/Box';
import { getIssues } from './apiServices/IssueApi';
import Login from './components/Login/Login';
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
import SideNavbar from './components/Sidebar/sidebar';
import { getProfiles } from './apiServices/ProfileApi';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const userLoggedIn = state.userLoggedIn;

  // get all issues
  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
  }, []);

  // get all profiles
  useEffect(() => {
    getProfiles()
      .then((data) => {
        dispatch({ type: 'GET_PROFILES', data: data });
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Box className={classes.appWrapper}>
          {userLoggedIn ? <SideNavbar /> : null}
          <Box className={classes.rightContent}>
            <Navbar />
            <Routes>
              <Route path="*" element={<Login />} />
              <Route path="/issues/:id" element={<IssuePage />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profiles" element={<ProfilesTable />} />
              <Route path="/profiles/:id" element={<Employee />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
