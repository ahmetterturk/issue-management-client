import React, { useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import { getIssues } from './apiServices/IssueApi';
import Login from './components/Login/Login';
import IssuePage from './components/IssuePage/IssuePage';
import { AppContext } from './contextReducer/Context';
import { initialState } from './contextReducer/InitialState';
import reducer from './contextReducer/Reducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Issues from './components/Issues/Issues';
import SideNavbar from './components/Sidebar/sidebar';
import useStyles, { theme } from './styles';
import UserProfileForm from './components/UserProfile/UserProfileForm';
import EmployeeTable from './components/Employees/EmployeeTable';
import { allUsers } from './apiServices/UserApi';
import Employee from './components/Employees/SingleEmployee/Employee';
import GraphsPage from './components/Graphs/GraphsPage';
import SignupPage from './components/Signup/SignupPage';
import { ThemeProvider } from '@mui/styles';

const App = () => {
  const classes = useStyles();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // get all issues
  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
  }, [state.counter, state.currentUser]);
  console.log(state.issues);
  useEffect(() => {
    allUsers()
      .then((data) => {
        dispatch({ type: 'GET_USERS', data: data });
        setTimeout(() => {
          dispatch({ type: 'AFTER_LOGGEDIN' });
        }, 4000);
      })
      .catch((err) => console.log(err));
  }, [state.currentUser, state.counter]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box className={classes.appWrapper}>
            {state.currentUser && (
              <SideNavbar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            )}
            <Box className={classes.rightContent}>
              {state.currentUser && (
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
              )}
              <Routes>
                <Route path='*' element={<Login />} />
                <Route path='/issues/:id' element={<IssuePage />} />
                <Route path='/issues' element={<Issues />} />
                <Route path='/userProfile/:id' element={<UserProfileForm />} />
                <Route path='/employee' element={<EmployeeTable />} />
                <Route path='/employee/:id' element={<Employee />} />
                <Route path='/employeeSignup' element={<SignupPage />} />
                <Route path='/graphs' element={<GraphsPage />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
