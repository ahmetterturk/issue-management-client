import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupPage from './SignupPage';
import { WithProviders } from '../../testUtils/WithProviders';

const SignupPageWithProviders = WithProviders(SignupPage);

describe('SignupPage', () => {
  const defaultProps = {
    signupUser: () => Promise.resolve({ status: 200 }),
  };
  it('should render form title', () => {
    render(<SignupPageWithProviders {...defaultProps} />);

    expect(screen.getByText('Create Employee Account')).toBeInTheDocument();
  });
  it('should show an error if the user is logged out', () => {
    const SignupPageWithNoUser = WithProviders(SignupPage, {
      currentUser: null,
    });
    render(<SignupPageWithNoUser {...defaultProps} />);

    expect(
      screen.getByText(
        'You cannot access the application unless you login first'
      )
    ).toBeInTheDocument();
  });

  it('should show an error if the user is not an admin', () => {
    const SignupPageNotAdmin = WithProviders(SignupPage, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });
    render(<SignupPageNotAdmin {...defaultProps} />);

    expect(
      screen.getByText('401 You are not authorized to access this page')
    ).toBeInTheDocument();
  });
});
