import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SignupFormView } from './SignupForm';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const SignupFormWithProviders = WithProviders(SignupFormView);

// Tests for SignupForm component
describe('SignupForm', () => {
  const defaultProps = {
    signupUser: () => Promise.resolve({ status: 200 }),
  };
  it('should render form title', () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    // we expect to always render the create employee account title
    expect(screen.getByText('Create Employee Account')).toBeInTheDocument();
  });
  it('should show an error when the first name is shorter than 3 characters', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    // We click on the create account button
    await userEvent.click(screen.getByText('Create account'));
    // We type in a first name that's too short
    await userEvent.type(screen.getByLabelText('First Name'), 'hi');

    // we expect to show an error message regarding the first name
    expect(
      screen.getByText("Firstname can't be blank, minimum of 3 characters")
    ).toBeInTheDocument();
  });

  it('should show an error when the last name is shorter than 3 characters', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    // We click on the create account button
    await userEvent.click(screen.getByText('Create account'));
    // We type in a last name that's too short
    await userEvent.type(screen.getByLabelText('Last Name'), 'hi');

    // we expect to show an error message regarding the last name
    expect(
      screen.getByText("Lastname can't be blank, minimum of 3 characters")
    ).toBeInTheDocument();
  });
  it('should show an error when the email/password is empty', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    // We click on the create account button
    await userEvent.click(screen.getByText('Create account'));
    // We type in an invalid length email
    await userEvent.type(screen.getByLabelText('Email'), 'hi');

    // we expect to show an error message regarding the email
    expect(
      screen.getByText("Please add your email, input can't be blank")
    ).toBeInTheDocument();
  });
  it('should create an employee successfully', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    // we type in the first name
    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    // we type in the last name
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    // we type in the email
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.com');
    // we type in the password
    await fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'not-john-doe' },
    });
    await act(async () => {
      // We click on the create account button
      await userEvent.click(screen.getByText('Create account'));
    });

    // we expect to successfully dispatch 2 actions
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CREATE_SUCCESS' });
  });
  it('should show an error on stauts=400', async () => {
    // we pass down a 400 response for signupUser
    const errorMessage = '400 Error';
    const signupUser = () =>
      Promise.resolve({ status: 400, data: { message: errorMessage } });
    render(
      <SignupFormWithProviders {...defaultProps} signupUser={signupUser} />
    );

    // we type in the first name
    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    // we type in the last name
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    // we type in the email
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.com');
    // we type in the password
    await fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'not-john-doe' },
    });
    await act(async () => {
      // We click on the create account button
      await userEvent.click(screen.getByText('Create account'));
    });

    // we expect for an error message to be rendered in the dom
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  it('should show an error on stauts=400', async () => {
    // we pass down a signupUser callback that will reject with an error message
    const errorMessage = 'Network Error';
    const signupUser = () => Promise.reject(errorMessage);
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(
      <SignupFormWithProviders {...defaultProps} signupUser={signupUser} />
    );

    // we type in the first name
    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    // we type in the last name
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    // we type in the email
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.com');
    // we type in the password
    await fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'not-john-doe' },
    });
    await act(async () => {
      // We click on the create account button
      await userEvent.click(screen.getByText('Create account'));
    });

    // we expect for an error message to be logged
    expect(consoleLogSpy).toHaveBeenCalledWith(errorMessage);
  });
});
