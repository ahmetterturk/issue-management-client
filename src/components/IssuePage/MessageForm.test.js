import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageFormView } from './MessageForm';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MessageFormWithProviders = WithProviders(MessageFormView);

describe('MessageForm', () => {
  const defaultProps = {
    issueId: 100,
    userName: 'johnDoe',
    userId: 200,
  };
  it('should render form title', () => {
    render(<MessageFormWithProviders {...defaultProps} />);

    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('create a message successfully', async () => {
    const createMessage = () => Promise.resolve();
    render(
      <MessageFormWithProviders
        {...defaultProps}
        createMessage={createMessage}
      />
    );
    await userEvent.click(screen.getByText('Send Message'));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should set form data when input is updated', async () => {
    // const expectedError = 'some-error';
    // const consoleLogSpy = jest.spyOn(console, 'log');
    const createMessage = jest.fn().mockResolvedValue();
    const message = 'Some message';
    render(
      <MessageFormWithProviders
        {...defaultProps}
        createMessage={createMessage}
      />
    );
    await userEvent.type(screen.getByLabelText('messageBody'), message);
    await userEvent.click(screen.getByText('Send Message'));

    expect(createMessage).toHaveBeenCalledWith({
      ...defaultProps,
      messageBody: message,
    });
  });

  it('should log an error when the issue is not updated', async () => {
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const createMessage = () => Promise.reject(expectedError);
    render(
      <MessageFormWithProviders
        {...defaultProps}
        createMessage={createMessage}
      />
    );
    await userEvent.click(screen.getByText('Send Message'));

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
