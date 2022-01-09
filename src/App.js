import React, { useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import { getIssues } from './apiServices/IssueApi';
import IssuePage from './components/IssuePage/IssuePage';
import { AppContext } from './contextReducer/Context';
import { initialState } from './contextReducer/InitialState';
import reducer from './contextReducer/Reducer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Issues from './components/Issues/Issues';
import SideNavbar from './components/Sidebar/sidebar';
import useStyles, { theme } from './styles';
import EmployeeTable from './components/Employees/EmployeeTable';
import { allUsers } from './apiServices/UserApi';
import Employee from './components/Employees/SingleEmployee/Employee';
import GraphsPage from './components/Graphs/GraphsPage';
import SignupPage from './components/Signup/SignupPage';
import { ThemeProvider } from '@mui/styles';
import NotFoundPage from './components/ErrorPages/NotFoundPage';
import LoginForm from './components/Login/LoginForm';
import ProfilePage from './components/UserProfile/ProfilePage';
import DashboardPage from './components/Dashboard/DashboardPage';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles({ isLoggedIn: !!state.currentUser });

  // get all issues
  useEffect(() => {
    dispatch({ type: 'SET_ISSUESISLOADING', data: true });
    getIssues()
      .then((data) => {
        dispatch({ type: 'GET_ISSUES', data: data });
        dispatch({ type: 'SET_ISSUESISLOADING', data: false });
      })
      .catch((err) => console.log(err));
  }, [state.counter, state.currentUser]);

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
                <Route path='/' element={<LoginForm />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/issues' element={<Issues />} />
                <Route path='/graphs' element={<GraphsPage />} />
                <Route path='/issues/:id' element={<IssuePage />} />
                <Route path='/employee' element={<EmployeeTable />} />
                <Route path='/employee/:id' element={<Employee />} />
                <Route path='/userProfile/:id' element={<ProfilePage />} />
                <Route path='/employeeSignup' element={<SignupPage />} />
                <Route path='/404' element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to='/404' />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
