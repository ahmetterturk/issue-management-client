import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmployeeView } from './Employee';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react/dist/pure';

const EmployeeWithProviders = WithProviders(EmployeeView);

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
  it('should render title', () => {
    render(<EmployeeWithProviders {...defaultProps} />);

    expect(screen.getByText('Employee')).toBeInTheDocument();
  });
  it('should show an error if the user is not an admin title', () => {
    const EmployeeWithProviders = WithProviders(EmployeeView, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });
    render(<EmployeeWithProviders {...defaultProps} />);

    expect(
      screen.getByText('401 You are not authorized to access this page')
    ).toBeInTheDocument();
  });

  it('should show an error when the singleUser returns 500', async () => {
    const singleUser = () => Promise.resolve({ status: 500 });
    await act(() => {
      render(
        <EmployeeWithProviders {...defaultProps} singleUser={singleUser} />
      );
    });

    expect(
      screen.getByText('Please make sure the user exist')
    ).toBeInTheDocument();
  });
  it('should log an error when the singleUser request fails', async () => {
    const expectedError = 'SingleUserError';
    const singleUser = () => Promise.reject(expectedError);
    const consoleLogSpy = jest.spyOn(console, 'log');
    await act(() => {
      render(
        <EmployeeWithProviders {...defaultProps} singleUser={singleUser} />
      );
    });
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });

  it('should delete employee successfully', async () => {
    await act(async () => {
      render(<EmployeeWithProviders {...defaultProps} />);
    });
    await act(async () => {
      await userEvent.click(screen.getByTestId('DeleteIcon'));
      await userEvent.click(screen.getByText('Delete'));
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
  });
  it('should log an error when the deleteUser request fails', async () => {
    const expectedError = 'DeleteUserError';
    const deleteUser = () => Promise.reject(expectedError);
    const consoleLogSpy = jest.spyOn(console, 'log');

    await act(async () => {
      render(
        <EmployeeWithProviders {...defaultProps} deleteUser={deleteUser} />
      );
    });
    await act(async () => {
      await userEvent.click(screen.getByTestId('DeleteIcon'));
      await userEvent.click(screen.getByText('Delete'));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });

  // it('should show an error when issue title is empty', async () => {
  //   render(<EmployeeWithProviders {...defaultProps} />);
  //   await userEvent.click(screen.getByText('Edit Issue'));

  //   const titleInput = screen.getByLabelText('Title');
  //   fireEvent.change(titleInput, { target: { value: '' } });

  //   await userEvent.click(screen.getByText('Update Issue'));

  //   expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
  // });
  // it('should show an error when issue description is empty', async () => {
  //   render(<EmployeeWithProviders {...defaultProps} />);
  //   await userEvent.click(screen.getByText('Edit Issue'));

  //   fireEvent.change(screen.getByLabelText('Description'), {
  //     target: { value: '' },
  //   });

  //   await userEvent.click(screen.getByText('Update Issue'));

  //   expect(screen.getByText("Description can't be blank")).toBeInTheDocument();
  // });

  // it('should update the issue successfully', async () => {
  //   const updateIssue = () => Promise.resolve();
  //   render(
  //     <EmployeeWithProviders {...defaultProps} updateIssue={updateIssue} />
  //   );
  //   await userEvent.click(screen.getByText('Edit Issue'));

  //   userEvent.type(screen.getByLabelText('Title'), 'New shiny title');
  //   userEvent.type(
  //     screen.getByLabelText('Description'),
  //     'New shiny description'
  //   );

  //   await userEvent.click(screen.getByText('Update Issue'));

  //   expect(mockDispatch).toHaveBeenCalledTimes(2);
  // });

  // it('should log an error when the issue is not updated', async () => {
  //   const expectedError = 'some-error';
  //   const consoleLogSpy = jest.spyOn(console, 'log');
  //   const updateIssue = () => Promise.reject(expectedError);
  //   render(
  //     <EmployeeWithProviders {...defaultProps} updateIssue={updateIssue} />
  //   );
  //   await userEvent.click(screen.getByText('Edit Issue'));
  //   await userEvent.click(screen.getByText('Update Issue'));

  //   expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  // });
});
