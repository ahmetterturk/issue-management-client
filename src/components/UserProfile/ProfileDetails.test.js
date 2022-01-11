import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ProfileDetailsView } from './ProfileDetails';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const ProfileDetailsWithProviders = WithProviders(ProfileDetailsView);

describe('ProfileDetails', () => {
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

    expect(screen.getByText('Save Details')).toBeInTheDocument();
  });

  it('should update the user successfully', async () => {
    const updateUser = () => Promise.resolve({});
    render(
      <ProfileDetailsWithProviders {...defaultProps} updateUser={updateUser} />
    );
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Save Details'));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_SUCCESS' });
  });

  it('should log an error when the user is not updated', async () => {
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const updateUser = () => Promise.reject(expectedError);
    render(
      <ProfileDetailsWithProviders {...defaultProps} updateUser={updateUser} />
    );
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });
    await act(async () => {
      await userEvent.click(screen.getByText('Save Details'));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
