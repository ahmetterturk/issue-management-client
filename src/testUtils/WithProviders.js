import { AppContext } from '../contextReducer/Context';
import { ThemeProvider } from '@mui/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../styles';

export const mockDispatch = jest.fn();
export const currentUser = {
  userDetails: {
    firstName: 'John',
    lastName: 'Doe',
    image: 'some-image'
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjp0cnVlfQ.5T-y5t-zMXrVQFZ62AmTu0zGAzKYbqfkh1U02USuDZY',
};
export const WithProviders = (ReactComponent) => (props) => {
    return (
      <AppContext.Provider
        value={{
          state: {
            currentUser,
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
