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

// Tests for Login component
describe('Login', () => {
  it("should render app's name", () => {
    render(<LoginWithProviders />);

    // we expect to always render the login button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it("shouldn't login if email is empty", async () => {
    const emailError = 'Email cannot be blank!';

    render(<LoginWithProviders />);
    // we click on the login button
    await userEvent.click(screen.getByRole('button'));

    // we expect for the email error message to be in the document
    expect(screen.getByText(emailError)).toBeInTheDocument();
  });

  it('shouldnt login if password is empty', async () => {
    const passwordError = 'Password cannot be blank!';

    render(<LoginWithProviders />);
    // we click on the login button
    await userEvent.click(screen.getByRole('button'));

    // we expect for the password error message to be in the document
    expect(screen.getByText(passwordError)).toBeInTheDocument();
  });

  it('should login successfully', async () => {
    // we mock loginUser with a successful login object
    const successfulLoginUser = jest
      .fn()
      .mockResolvedValue({ status: 200, ...currentUser });
    render(<LoginWithProviders loginUser={successfulLoginUser} />);
    // we type fake login data to bypass form checks
    userEvent.type(screen.getByLabelText('Email Address'), 'username@user.com');
    userEvent.type(screen.getByLabelText('Password'), 'p255w0rD');

    // we click on the login button
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    // we should expect a LOGIN_SUCCESS action to be dispatched
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'LOGIN_SUCCESS' });
  });

  it('should show error if login returns 400', async () => {
    // we mock loginUser with a 400 response
    const errorMessage = 'Something went wrong';
    const loginUser400 = jest
      .fn()
      .mockResolvedValue({ status: 400, data: { message: errorMessage } });
    render(<LoginWithProviders loginUser={loginUser400} />);
    // we type fake login data to bypass form checks
    userEvent.type(screen.getByLabelText('Email Address'), 'username@user.com');
    userEvent.type(screen.getByLabelText('Password'), 'p255w0rD');

    // we click on the login button
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    // we expect an error message to be shown to the user
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show error if login returns 404', async () => {
    // we mock loginUser with a 404 response
    const errorMessage = 'Something went wrong';
    const loginUser404 = jest
      .fn()
      .mockResolvedValue({ status: 404, data: { message: errorMessage } });
    render(<LoginWithProviders loginUser={loginUser404} />);
    // we type fake login data to bypass form checks
    userEvent.type(screen.getByLabelText('Email Address'), 'username@user.com');
    userEvent.type(screen.getByLabelText('Password'), 'p255w0rD');

    // we click on the login button
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    // we expect an error message to be shown to the user
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
