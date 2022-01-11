import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { IssuePageView } from './IssuePage';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';

const IssuePageWithProviders = WithProviders(IssuePageView);

describe('IssuePage', () => {
  const issue = { title: 'issue title', members: ['John Doe'] };
  const defaultProps = {
    getIssue: () => Promise.resolve(issue),
    getAllMessages: () => Promise.resolve([]),
    useParams: () => ({ id: 100 }),
  };
  it('should render issues', async () => {
    await act(async () => {
      await render(<IssuePageWithProviders {...defaultProps} />);
    });

    expect(screen.getByTestId('issue-title')).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ASSIGNED_ISSUES',
      data: [],
    });
  });

  it('should log an error when the issue is not updated', async () => {
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const rejectPromise = () => Promise.reject(expectedError);
    await act(async () => {
      await render(
        <IssuePageWithProviders
          {...defaultProps}
          getIssue={rejectPromise}
          getAllMessages={rejectPromise}
        />
      );
    });
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
