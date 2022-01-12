import { AppContext } from '../contextReducer/Context';
import { ThemeProvider } from '@mui/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../styles';

export const mockDispatch = jest.fn();
export const currentUser = {
  userDetails: {
    firstName: 'John',
    lastName: 'Doe',
    image: 'some-image',
    email: 'email@email.com',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjp0cnVlLCJpZCI6MTAwfQ.cPODiQNnsmxal-KoU6iKwDuEatK9bCHE8DdBh80RYY4',
};
const allUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    isAdmin: false,
    _id: 300,
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    isAdmin: true,
    _id: 301,
  },
];
export const WithProviders =
  (ReactComponent, options = {}) =>
  (props) => {
    return (
      <AppContext.Provider
        value={{
          state: {
            issuesIsLoading: false,
            currentUser:
              'currentUser' in options ? options.currentUser : currentUser,
            assignedIssues: [
              {
                _id: 100,
              },
            ],
            issues: options.issues || [
              { _id: 100, status: 'New', members: allUsers },
              { _id: 101, status: 'Resolved', members: allUsers },
              { _id: 102, status: 'Pending', members: allUsers },
            ],
            users: {
              allUsers: 'allUsers' in options ? options.allUsers : allUsers,
            },
            ...(options.state ? options.state : {}),
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
