import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { IssuePageView } from './IssuePage';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';

const IssuePageWithProviders = WithProviders(IssuePageView);

// Tests for IssuePage component
describe('IssuePage', () => {
  // we initialise a defailt issue and different callbacks for a generic state
  const issue = { title: 'issue title', members: ['John Doe'] };
  const defaultProps = {
    getIssue: () => Promise.resolve(issue),
    getAllMessages: () => Promise.resolve([]),
    useParams: () => ({ id: 100 }),
  };
  it('should render issues', async () => {
    // we wait for the component to render and resolve any rerenders
    await act(async () => {
      await render(<IssuePageWithProviders {...defaultProps} />);
    });

    // we expect for the issue title to be rendered
    expect(screen.getByTestId('issue-title')).toBeInTheDocument();
    // we expect for the SET_ASSIGNED_ISSUES action to be dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ASSIGNED_ISSUES',
      data: [],
    });
  });

  it('should log an error when the issue is not updated', async () => {
    // we spy on console.log and send down callbacks that will reject when called
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

    // we expect for the error to be logged.
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
