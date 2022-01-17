import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ProfileAvatarView } from './ProfileAvatar';
import { WithProviders } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const ProfileAvatarWithProviders = WithProviders(ProfileAvatarView);

// Tests for ProfileAvatar component
describe('ProfileAvatar', () => {
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
  it('should render save image button', () => {
    render(<ProfileAvatarWithProviders {...defaultProps} />);

    // we expect to always render a save image button
    expect(screen.getByText('Save Image')).toBeInTheDocument();
  });

  it('should update the user successfully', async () => {
    // we pass down a uploadProfileImage that resolves with an expectate image src
    const uploadProfileImage = () =>
      Promise.resolve({ image: { src: 'some-src' } });
    render(
      <ProfileAvatarWithProviders
        {...defaultProps}
        uploadProfileImage={uploadProfileImage}
      />
    );

    // we wait for any rerenders
    await act(async () => {
      // we click on save image
      await userEvent.click(screen.getByText('Save Image'));
    });

    // We expect NOT to see a spinner (role=progressbar)
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('should log an error when the image is not updated', async () => {
    // we pass down a uploadProfileImage callback that will reject with a specific error
    // and spy on console.log
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const uploadProfileImage = () => Promise.reject(expectedError);
    render(
      <ProfileAvatarWithProviders
        {...defaultProps}
        uploadProfileImage={uploadProfileImage}
      />
    );

    // we wait for any rerenders
    await act(async () => {
      // we click on save image
      await userEvent.click(screen.getByText('Save Image'));
    });

    // we expect for the error to have been logged
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
