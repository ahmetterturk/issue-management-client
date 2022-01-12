import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SignupFormView } from './SignupForm';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const SignupFormWithProviders = WithProviders(SignupFormView);

describe('SignupForm', () => {
  const defaultProps = {
    signupUser: () => Promise.resolve({ status: 200 }),
  };
  it('should render form title', () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    expect(screen.getByText('Create Employee Account')).toBeInTheDocument();
  });
  it('should show an error when the first name is shorter than 3 characters', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    await userEvent.click(screen.getByText('Create account'));
    await userEvent.type(screen.getByLabelText('First Name'), 'hi');

    expect(
      screen.getByText("Firstname can't be blank, minimum of 3 characters")
    ).toBeInTheDocument();
  });

  it('should show an error when the last name is shorter than 3 characters', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    await userEvent.click(screen.getByText('Create account'));
    await userEvent.type(screen.getByLabelText('Last Name'), 'hi');

    expect(
      screen.getByText("Lastname can't be blank, minimum of 3 characters")
    ).toBeInTheDocument();
  });
  it('should show an error when the email/password is empty', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    await userEvent.click(screen.getByText('Create account'));
    await userEvent.type(screen.getByLabelText('Email'), 'hi');

    expect(
      screen.getByText("Please add your email, input can't be blank")
    ).toBeInTheDocument();
  });
  it('should create an employee successfully', async () => {
    render(<SignupFormWithProviders {...defaultProps} />);

    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.com');
    await fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'not-john-doe' },
    });
    await act(async () => {
      await userEvent.click(screen.getByText('Create account'));
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CREATE_SUCCESS' });
  });
  it('should show an error on stauts=400', async () => {
    const errorMessage = '400 Error';
    const signupUser = () =>
      Promise.resolve({ status: 400, data: { message: errorMessage } });
    render(
      <SignupFormWithProviders {...defaultProps} signupUser={signupUser} />
    );

    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.com');
    await fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'not-john-doe' },
    });
    await act(async () => {
      await userEvent.click(screen.getByText('Create account'));
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  it('should show an error on stauts=400', async () => {
    const errorMessage = 'Network Error';
    const signupUser = () => Promise.reject(errorMessage);
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(
      <SignupFormWithProviders {...defaultProps} signupUser={signupUser} />
    );

    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.com');
    await fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'not-john-doe' },
    });
    await act(async () => {
      await userEvent.click(screen.getByText('Create account'));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(errorMessage);
  });
});
