import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MessageView } from './Message';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MessageWithProviders = WithProviders(MessageView);

// Tests for Message component
describe('Message', () => {
  // We initialise the props with a default message
  const defaultProps = {
    message: {
      userName: 'userName',
      createdAt: 'createdAt',
      messageBody: 'messageBody',
      userId: 100,
      _id: 200,
    },
  };
  it('should delete message successfully', async () => {
    // we send deleteMessage as a stub that will resolve
    const deleteMessage = jest.fn().mockResolvedValue();
    render(
      <MessageWithProviders {...defaultProps} deleteMessage={deleteMessage} />
    );
    // we expect for the userName field to be rendered
    expect(screen.getByText('userName')).toBeInTheDocument();
    // we click on the deleteicon and wait for any rerenders
    await act(async () => {
      await userEvent.click(screen.getByTestId('DeleteIcon'));
    });

    // we expect for the deleteMessage callback to be called with 200
    expect(deleteMessage).toHaveBeenCalledWith(200);
    // we expect for the INCREASE_COUNTER action to be dispatched
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
  });

  it('should log an error when the issue is not updated', async () => {
    // we spy on console.lod and set deleteMessage for a that returns a rejecting promise
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const deleteMessage = () => Promise.reject(expectedError);
    render(
      <MessageWithProviders {...defaultProps} deleteMessage={deleteMessage} />
    );

    // We click on the Delete icon and wait for any rerenders
    await act(async () => {
      await userEvent.click(screen.getByTestId('DeleteIcon'));
    });

    // We expect for console.log to have been called with our error
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
