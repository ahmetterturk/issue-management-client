import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar';
import { AppContext } from '../../contextReducer/Context';
import { theme } from '../../styles';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';

it('should render with no errors', () => {
  render(
    <AppContext.Provider
      value={{
        state: {
          currentUser: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjp0cnVlfQ.5T-y5t-zMXrVQFZ62AmTu0zGAzKYbqfkh1U02USuDZY',
          },
        },
        dispatch: () => {},
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
  expect(screen.getByText('Lock Security')).toBeInTheDocument();
});

it('should render on large screens', () => {
  const smallTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 9998,
        lg: 9999,
        xl: 10000,
      },
    },
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          defaultMatches: true,
        },
      },
    },
  });

  render(
    <AppContext.Provider
      value={{
        state: {
          currentUser: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjp0cnVlfQ.5T-y5t-zMXrVQFZ62AmTu0zGAzKYbqfkh1U02USuDZY',
          },
        },
        dispatch: () => {},
      }}
    >
      <ThemeProvider theme={smallTheme}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
  expect(screen.getByText('Lock Security')).toBeInTheDocument();
});
