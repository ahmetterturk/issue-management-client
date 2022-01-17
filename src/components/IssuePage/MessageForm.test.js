import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageFormView } from './MessageForm';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MessageFormWithProviders = WithProviders(MessageFormView);

// Tests for MessageForm component
describe('MessageForm', () => {
  const defaultProps = {
    issueId: 100,
    userName: 'johnDoe',
    userId: 200,
  };
  it('should render main button with no errors', () => {
    render(<MessageFormWithProviders {...defaultProps} />);

    // we expect for the button to always render correctly
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('create a message successfully', async () => {
    // we pass down a createMessage callback that simply resolves
    const createMessage = () => Promise.resolve();
    render(
      <MessageFormWithProviders
        {...defaultProps}
        createMessage={createMessage}
      />
    );

    // we click on the send message button
    await userEvent.click(screen.getByText('Send Message'));

    // we expect for an action to have been dispatched once.
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should set form data when input is updated', async () => {
    // we pass down a createMessageStub that resolves
    const createMessage = jest.fn().mockResolvedValue();
    const message = 'Some message';
    render(
      <MessageFormWithProviders
        {...defaultProps}
        createMessage={createMessage}
      />
    );

    // we type an expected message in the body of the message
    await userEvent.type(screen.getByLabelText('messageBody'), message);
    // We click on the send message button
    await userEvent.click(screen.getByText('Send Message'));

    // we expect for the createMessage callback to have been called with the typed message body
    expect(createMessage).toHaveBeenCalledWith({
      ...defaultProps,
      messageBody: message,
    });
  });

  it('should log an error when the issue is not updated', async () => {
    // we spy on console.log and pass down a create message callback that rejects a promise
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const createMessage = () => Promise.reject(expectedError);
    render(
      <MessageFormWithProviders
        {...defaultProps}
        createMessage={createMessage}
      />
    );

    // we click on the send message button
    await userEvent.click(screen.getByText('Send Message'));

    // We expect for the console.log spy to have been called with our error
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
