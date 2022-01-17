import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ProfileDetailsView } from './ProfileDetails';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const ProfileDetailsWithProviders = WithProviders(ProfileDetailsView);

// Tests for ProfileDetails component
describe('ProfileDetails', () => {
  // default issue for all tests
  const defaultProps = {
    issue: {
      title: 'title',
      description: 'description',
      priority: 'priority',
      status: 'status',
      type: 'type',
      userId: 'userId',
      userName: 'userName',
    },
    id: 100,
  };
  it('should render save details button', () => {
    render(<ProfileDetailsWithProviders {...defaultProps} />);

    // Expect the save details button to always be rendered
    expect(screen.getByText('Save Details')).toBeInTheDocument();
  });

  it('should update the user successfully', async () => {
    // we pass down updateUser with resolved promise
    const updateUser = () => Promise.resolve({});
    render(
      <ProfileDetailsWithProviders {...defaultProps} updateUser={updateUser} />
    );

    // we type a password
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    // we wait for any rerenders after...
    await act(async () => {
      // we click on the save details button
      await userEvent.click(screen.getByText('Save Details'));
    });

    // we expect an UPDATE_SUCCESS action to have been dispatched
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_SUCCESS' });
  });

  it('should log an error when the user is not updated', async () => {
    // we pass down a updateUser that will reject with an error and spy on console.log
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const updateUser = () => Promise.reject(expectedError);
    render(
      <ProfileDetailsWithProviders {...defaultProps} updateUser={updateUser} />
    );

    // we type in a password
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    // we wait for any rerenders after...
    await act(async () => {
      // we click on the save details button
      await userEvent.click(screen.getByText('Save Details'));
    });

    // we expect to have logged the specific error
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
