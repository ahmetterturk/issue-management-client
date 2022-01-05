import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './sidebar';
import { AppContext } from '../../contextReducer/Context';
import { theme } from '../../styles';
import { ThemeProvider } from '@mui/styles';
import mediaQuery from 'css-mediaquery';

import userEvent from '@testing-library/user-event';

function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, {
      width: width,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
}

const mockDispatch = jest.fn();

const WithProviders = (ReactComponent) => (props) => {
  return (
    <AppContext.Provider
      value={{
        state: {
          currentUser: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjp0cnVlfQ.5T-y5t-zMXrVQFZ62AmTu0zGAzKYbqfkh1U02USuDZY',
          },
        },
        dispatch: mockDispatch,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ReactComponent {...props} />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const SidebarWithProviders = WithProviders(Sidebar);

describe('Sidebar', () => {
  it('should render with no errors', () => {
    render(<SidebarWithProviders />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should logout', () => {
    render(<SidebarWithProviders />);
    userEvent.click(screen.getByText('Log out'));
    expect(mockDispatch).toHaveBeenCalled();
  });

  describe('on smaller screens', () => {
    beforeEach(() => {
      window.matchMedia = createMatchMedia('200px');
    });

    it('should render on small screens', () => {
      render(<SidebarWithProviders isOpen />);
      expect(screen.getByText('© Lock Security')).toBeInTheDocument();
    });
  });
});
