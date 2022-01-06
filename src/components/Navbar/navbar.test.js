import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../contextReducer/Context';
import { theme } from '../../styles';
import { ThemeProvider } from '@mui/styles';
import mediaQuery from 'css-mediaquery';
import Navbar from './Navbar';

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
            userDetails: {
              firstName: 'John',
              lastName: 'Doe',
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjp0cnVlfQ.5T-y5t-zMXrVQFZ62AmTu0zGAzKYbqfkh1U02USuDZY',
          },
          assignedIssues: [],
          issues: [],
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

const NavbarWithProviders = WithProviders(Navbar);

describe('Navbar', () => {
  it("should render user's name", () => {
    render(<NavbarWithProviders />);

    expect(screen.getByText('Hi John Doe')).toBeInTheDocument();
  });

  describe('On larger screens', () => {
    it('should not render menu icon', () => {
      render(<NavbarWithProviders />);
      expect(screen.queryAllByTestId('MenuIcon')).toHaveLength(0);
    });
  });

  describe('On smaller screens', () => {
    beforeEach(() => {
      window.matchMedia = createMatchMedia('200px');
    });
    afterEach(() => {
      delete window.matchMedia;
    });

    it('should render menu icon', () => {
      render(<NavbarWithProviders />);
      expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
    });
  });
});
