import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeeTableView } from './EmployeeTable';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react/dist/pure';

const EmployeeTableWithProviders = WithProviders(EmployeeTableView);

// Tests for EmployeeTable component
describe('EmployeeTable', () => {
  const defaultProps = {
    deleteUser: () => Promise.resolve(),
  };
  it('should render title with no errors', () => {
    render(<EmployeeTableWithProviders {...defaultProps} />);

    // We expect for the title to always render
    expect(screen.getByText('Employees')).toBeInTheDocument();
  });
  it('should show an error if the user is not logged in', () => {
    // We simulate a non logged in user by setting currentUser to null
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      currentUser: null,
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    // We check that the message prompts the user to log in
    expect(
      screen.getByText(
        'You cannot access the application unless you login first'
      )
    ).toBeInTheDocument();
  });
  it('should show an error if the user is not an admin title', () => {
    // We initialise context with a non admin user by providing the appropriate token
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    // We check that the 401 message appears
    expect(
      screen.getByText('401 You are not authorized to access this page')
    ).toBeInTheDocument();
  });
  it("should show a spinner if the issues haven't loaded", () => {
    // we set state.issuesIsLoading to true to show the spinner for not loaded issues
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      state: {
        issuesIsLoading: true,
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    // we check for a spinner which has a role of progressbar
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show an update alert if recently updated', () => {
    // We set state.isUpdated to show when an employee has been recently updated
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      state: {
        isUpdated: true,
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    // We check that the updated message is shown in screen
    expect(
      screen.getByText('You have updated your profile successfully')
    ).toBeInTheDocument();
  });
  it('should show a creation alert if recently updated', () => {
    // We set state.isCreated to show the state whenever a user recently created an employee
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      state: {
        isCreated: true,
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    // We check that the created message is shown in screen
    expect(
      screen.getByText('You have created a new account successfully')
    ).toBeInTheDocument();
  });
  // Tests for when deleting employees
  describe('when deleting', () => {
    // We set state.isCreated to true and allUsers to a single user to recreate
    // a deletion scenario. This happens for all tests on this block
    const EmployeeTableSingleUser = WithProviders(EmployeeTableView, {
      state: {
        isCreated: true,
        users: {
          allUsers: [
            {
              firstName: 'Jane',
              lastName: 'Doe',
              isAdmin: true,
              _id: 301,
            },
          ],
        },
      },
    });

    it('should be able to delete an employee', async () => {
      render(<EmployeeTableSingleUser {...defaultProps} />);

      await act(async () => {
        // we click on the delete icon
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        // we click on the delete confirmation button
        await userEvent.click(screen.getByText('Delete'));
      });

      // we expect for the INCREASE_COUNTER action to have been dispatched at this point.
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    });
    it('should log an error when deletion fails', async () => {
      // we set deleteUser to reject the promise and set a spy on console.log
      const expectedError = 'DeleteError';
      const deleteUser = () => Promise.reject(expectedError);
      const consoleLogSpy = jest.spyOn(console, 'log');
      render(
        <EmployeeTableSingleUser {...defaultProps} deleteUser={deleteUser} />
      );

      await act(async () => {
        // we click on the delete icon
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        // we click on the delete confirmation button
        await userEvent.click(screen.getByText('Delete'));
      });

      // We expect console.log to have been called with the expected error
      expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
    });
  });
  // Tests for when paginating module;
  describe('when paginating', () => {
    // We set state.isCreated to true and allUsers to a six users to recreate
    // a pagination scenario. This happens for all tests on this block
    const EmployeeTableTenUsers = WithProviders(EmployeeTableView, {
      state: {
        isCreated: true,
        users: {
          allUsers: [
            ...new Array(5).fill({
              firstName: 'Jane',
              lastName: 'Doe',
              isAdmin: true,
              _id: 301,
            }),
            {
              firstName: 'Max',
              lastName: 'Doe',
              isAdmin: false,
              _id: 301,
            },
          ],
        },
      },
    });

    it('should be able to change rows per page', async () => {
      render(<EmployeeTableTenUsers {...defaultProps} />);
      // initially we expect the Max Doe user to be shown in the first page
      expect(screen.queryByText('Max Doe')).not.toBeNull();

      // click on the select for Rows per page
      await userEvent.click(screen.getByLabelText('Rows per page:'));
      // we select on 5 (Max is the 6th entry)
      await userEvent.click(screen.getByText('5'));

      // After changing the pagination total we expect Max Doe to not longer be shown
      expect(screen.queryByText('Max Doe')).toBeNull();
    });

    it('should be able to change pages', async () => {
      render(<EmployeeTableTenUsers {...defaultProps} />);

      // click on the select for Rows per page
      await userEvent.click(screen.getByLabelText('Rows per page:'));
      // we select on 5 (Max is the 6th entry)
      await userEvent.click(screen.getByText('5'));
      // Initially, we expect Max Doe to not be shown
      expect(screen.queryByText('Max Doe')).toBeNull();

      // When paginating through to the second page
      await userEvent.click(screen.getByTestId('KeyboardArrowRightIcon'));
      // We expect Max Doe to show up
      expect(screen.queryByText('Max Doe')).not.toBeNull();
    });
  });
});
