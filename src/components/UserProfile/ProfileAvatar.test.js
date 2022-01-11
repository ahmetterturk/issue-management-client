import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ProfileAvatarView } from './ProfileAvatar';
import { WithProviders } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { currentUser } from '../../testUtils/WithProviders';

const ProfileAvatarWithProviders = WithProviders(ProfileAvatarView);

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

    expect(screen.getByText('Save Image')).toBeInTheDocument();
  });

  it('should update the user successfully', async () => {
    const uploadProfileImage = () =>
      Promise.resolve({ image: { src: 'some-src' } });
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(
      <ProfileAvatarWithProviders
        {...defaultProps}
        uploadProfileImage={uploadProfileImage}
      />
    );
    await act(async () => {
      await userEvent.click(screen.getByText('Save Image'));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith('from upload image =>>', {
      ...currentUser.userDetails,
      image: 'some-src',
    });
  });

  it('should log an error when the image is not updated', async () => {
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const uploadProfileImage = () => Promise.reject(expectedError);
    render(
      <ProfileAvatarWithProviders
        {...defaultProps}
        uploadProfileImage={uploadProfileImage}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByText('Save Image'));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
