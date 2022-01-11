import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MessageView } from './Message';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MessageWithProviders = WithProviders(MessageView);

describe('Message', () => {
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
    const deleteMessage = jest.fn().mockResolvedValue();
    render(
      <MessageWithProviders {...defaultProps} deleteMessage={deleteMessage} />
    );

    expect(screen.getByText('userName')).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(screen.getByTestId('DeleteIcon'));
    });
    expect(deleteMessage).toHaveBeenCalledWith(200);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
  });

  it('should log an error when the issue is not updated', async () => {
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const deleteMessage = () => Promise.reject(expectedError);
    render(
      <MessageWithProviders {...defaultProps} deleteMessage={deleteMessage} />
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId('DeleteIcon'));
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
