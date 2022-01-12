import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginFormView } from './LoginForm';
import {
  WithProviders,
  mockDispatch,
  currentUser,
} from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react/dist/pure';

const LoginWithProviders = WithProviders(LoginFormView);

describe('Login', () => {
  it("should render app's name", () => {
    render(<LoginWithProviders />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shouldnt login if email is empty', async () => {
    const emailError = 'Email cannot be blank!';

    render(<LoginWithProviders />);
    userEvent.click(screen.getByRole('button'));
    await screen.findByText(emailError);
    expect(screen.getByText(emailError)).toBeInTheDocument();
  });

  it('shouldnt login if password is empty', async () => {
    const passwordError = 'Password cannot be blank!';

    render(<LoginWithProviders />);
    userEvent.click(screen.getByRole('button'));
    await screen.findByText(passwordError);
    expect(screen.getByText(passwordError)).toBeInTheDocument();
  });

  it('should login successfully', async () => {
    const successfulLoginUser = jest
      .fn()
      .mockResolvedValue({ status: 200, ...currentUser });
    render(<LoginWithProviders loginUser={successfulLoginUser} />);
    userEvent.type(screen.getByLabelText('Email Address'), 'username@user.com');
    userEvent.type(screen.getByLabelText('Password'), 'p255w0rD');

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'LOGIN_SUCCESS' });
  });

  it('should show error if login returns 400', async () => {
    const errorMessage = 'Something went wrong';
    const loginUser400 = jest
      .fn()
      .mockResolvedValue({ status: 400, data: { message: errorMessage } });
    render(<LoginWithProviders loginUser={loginUser400} />);
    userEvent.type(screen.getByLabelText('Email Address'), 'username@user.com');
    userEvent.type(screen.getByLabelText('Password'), 'p255w0rD');

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show error if login returns 404', async () => {
    const errorMessage = 'Something went wrong';
    const loginUser404 = jest
      .fn()
      .mockResolvedValue({ status: 404, data: { message: errorMessage } });
    render(<LoginWithProviders loginUser={loginUser404} />);
    userEvent.type(screen.getByLabelText('Email Address'), 'username@user.com');
    userEvent.type(screen.getByLabelText('Password'), 'p255w0rD');

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
