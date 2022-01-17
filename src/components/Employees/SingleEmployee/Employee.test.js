import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeeView } from './Employee';
import { WithProviders } from '../../../testUtils/WithProviders';
import { act } from '@testing-library/react/dist/pure';

const EmployeeWithProviders = WithProviders(EmployeeView);

// Tests for Employee component
describe('Employee', () => {
  const user = {
    imageUrl: 'image-src',
    firstName: 'first-name',
    lastName: 'last-name',
    email: 'email@email.com',
    isAdmin: true,
    createdAt: new Date(),
  };
  const defaultProps = {
    singleUser: () => Promise.resolve({ status: 200, singleUser: user }),
    deleteUser: () => Promise.resolve(),
  };
  it('should show an error if the user is not an admin title', () => {
    // initialise context with a user that is not an admin
    const EmployeeWithProviders = WithProviders(EmployeeView, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });
    render(<EmployeeWithProviders {...defaultProps} />);

    // we check the 401 message is rendered
    expect(
      screen.getByText('401 You are not authorized to access this page')
    ).toBeInTheDocument();
  });

  it('should show an error when the singleUser returns 500', async () => {
    // we mock the singleuser request to return status as 500
    const singleUser = () => Promise.resolve({ status: 500 });
    // We use the act block to make sure all rerenders happen after resolving the promise
    await act(() => {
      render(
        <EmployeeWithProviders {...defaultProps} singleUser={singleUser} />
      );
    });

    // we expect for the appropriate message to render in the page
    expect(
      screen.getByText('Please make sure the user exist')
    ).toBeInTheDocument();
  });
  it('should log an error when the singleUser request fails', async () => {
    // We mock singleUser to throw an error and spy on the console.log function
    const expectedError = 'SingleUserError';
    const singleUser = () => Promise.reject(expectedError);
    const consoleLogSpy = jest.spyOn(console, 'log');
    await act(() => {
      render(
        <EmployeeWithProviders {...defaultProps} singleUser={singleUser} />
      );
    });

    // We expect that the mocked error is logged accordingly
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
