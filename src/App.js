import React, { useEffect, useReducer } from 'react';
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
import SideNavbar from './components/Sidebar/sidebar';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // get all issues
  useEffect(() => {
    getIssues()
      .then((data) => dispatch({ type: 'GET_ISSUES', data: data }))
      .catch((err) => console.log(err));
  }, []);

  // console.log(state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <SideNavbar />
        <div style={{"marginLeft": 100}}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/issues/:id' element={<IssuePage />} />
          <Route path='/issues' element={<Issues />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profiles' element={<ProfilesTable />} />
          <Route path='/profiles/:id' element={<Employee />} />
        </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
