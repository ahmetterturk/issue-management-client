import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeeTableView } from './EmployeeTable';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react/dist/pure';

const EmployeeTableWithProviders = WithProviders(EmployeeTableView);

describe('EmployeeTable', () => {
  const defaultProps = {
    deleteUser: () => Promise.resolve(),
  };
  it('should render title', () => {
    render(<EmployeeTableWithProviders {...defaultProps} />);

    expect(screen.getByText('Employees')).toBeInTheDocument();
  });
  it('should show an error if the user is not logged in', () => {
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      currentUser: null,
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    expect(
      screen.getByText(
        'You cannot access the application unless you login first'
      )
    ).toBeInTheDocument();
  });
  it('should show an error if the user is not an admin title', () => {
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    expect(
      screen.getByText('401 You are not authorized to access this page')
    ).toBeInTheDocument();
  });
  it("should show a spinner if the issues haven't loaded", () => {
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      state: {
        issuesIsLoading: true,
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show an update alert if recently updated', () => {
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      state: {
        isUpdated: true,
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    expect(
      screen.getByText('You have updated your profile successfully')
    ).toBeInTheDocument();
  });
  it('should show a creation alert if recently updated', () => {
    const EmployeeTableWithProviders = WithProviders(EmployeeTableView, {
      state: {
        isCreated: true,
      },
    });

    render(<EmployeeTableWithProviders {...defaultProps} />);

    expect(
      screen.getByText('You have created a new account successfully')
    ).toBeInTheDocument();
  });
  describe('when deleting', () => {
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
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        await userEvent.click(screen.getByText('Delete'));
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    });
    it('should log an error when deletion fails', async () => {
      const expectedError = 'DeleteError';
      const deleteUser = () => Promise.reject(expectedError);
      const consoleLogSpy = jest.spyOn(console, 'log');
      render(
        <EmployeeTableSingleUser {...defaultProps} deleteUser={deleteUser} />
      );

      await act(async () => {
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        await userEvent.click(screen.getByText('Delete'));
      });

      expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
    });
  });
  describe('when paginating', () => {
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
      expect(screen.queryByText('Max Doe')).not.toBeNull();

      await userEvent.click(screen.getByLabelText('Rows per page:'));
      await userEvent.click(screen.getByText('5'));

      expect(screen.queryByText('Max Doe')).toBeNull();
    });

    it('should be able to change pages', async () => {
      render(<EmployeeTableTenUsers {...defaultProps} />);

      await userEvent.click(screen.getByLabelText('Rows per page:'));
      await userEvent.click(screen.getByText('5'));
      expect(screen.queryByText('Max Doe')).toBeNull();

      await userEvent.click(screen.getByTestId('KeyboardArrowRightIcon'));
      expect(screen.queryByText('Max Doe')).not.toBeNull();
    });
  });
});
