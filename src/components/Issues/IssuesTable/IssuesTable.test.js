import React from 'react';
import { render, screen, act, within } from '@testing-library/react';
import { IssuesTableView } from './IssuesTable';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const IssuesTableWithProviders = WithProviders(IssuesTableView);

describe('IssuesTable', () => {
  const defaultProps = {
    issuesList: [
      {
        _id: 100,
        createdAt: new Date(),
        title: 'My very specific issue title',
        description: 'description',
        priority: 'priority',
        status: 'Pending',
        type: 'type',
        userId: 'userId',
        userName: 'userName',
      },
      {
        _id: 200,
        createdAt: new Date(),
        title: 'My second issue',
        description: 'description',
        priority: 'priority',
        status: 'New',
        type: 'type',
        userId: 'userId',
        userName: 'userName',
      },
      {
        _id: 100,
        createdAt: new Date(),
        title: 'My third issue',
        description: 'description',
        priority: 'priority',
        status: 'Resolved',
        type: 'Public',
        userId: 'userId',
        userName: 'userName',
      },
    ],
    deleteIssue: () => Promise.resolve(),
  };
  it('should render a spinner if the issues are loading', () => {
    const IssuesTableWithLoadingIssues = WithProviders(IssuesTableView, {
      state: { issuesIsLoading: true },
    });
    render(<IssuesTableWithLoadingIssues {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should render the issue list', async () => {
    render(<IssuesTableWithProviders {...defaultProps} />);

    expect(
      screen.getByText(defaultProps.issuesList[0].title)
    ).toBeInTheDocument();
  });
  it('should only show public issues for non-admins', async () => {
    const IssuesTableWithProviders = WithProviders(IssuesTableView, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });
    render(<IssuesTableWithProviders {...defaultProps} />);

    expect(screen.queryByText(defaultProps.issuesList[0].title)).toBeNull();
    expect(screen.queryByText(defaultProps.issuesList[1].title)).toBeNull();
    expect(screen.queryByText(defaultProps.issuesList[2].title)).not.toBeNull();
  });
  describe('when deleting', () => {
    const issuesList = [
      {
        _id: 100,
        createdAt: new Date(),
        title: 'My very specific issue title',
        description: 'description',
        priority: 'priority',
        status: 'Pending',
        type: 'type',
        userId: 'userId',
        userName: 'userName',
      },
    ];
    it('should delete successfully', async () => {
      render(
        <IssuesTableWithProviders {...defaultProps} issuesList={issuesList} />
      );
      await act(async () => {
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        await userEvent.click(screen.getByText('Delete'));
      });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    });
    it('should log an error message if the deletion fails', async () => {
      const expectedError = 'Network Error';
      const deleteIssue = () => Promise.reject(expectedError);
      const consoleLogSpy = jest.spyOn(console, 'log');
      render(
        <IssuesTableWithProviders
          issuesList={issuesList}
          deleteIssue={deleteIssue}
        />
      );
      await act(async () => {
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        await userEvent.click(screen.getByText('Delete'));
      });
      expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('when paginating', () => {
    const issuesList = [
      ...new Array(10).fill({
        _id: 100,
        createdAt: new Date(),
        title: 'My very specific issue title',
        description: 'description',
        priority: 'priority',
        status: 'Pending',
        type: 'type',
        userId: 'userId',
        userName: 'userName',
      }),
      {
        _id: 200,
        createdAt: new Date(),
        title: 'My last issue',
        description: 'description',
        priority: 'priority',
        status: 'New',
        type: 'type',
        userId: 'userId',
        userName: 'userName',
      },
    ];

    it('should be able to change rows per page', async () => {
      render(
        <IssuesTableWithProviders {...defaultProps} issuesList={issuesList} />
      );
      expect(screen.queryByText('My last issue')).toBeNull();

      await userEvent.click(screen.getByLabelText('Rows per page:'));
      await userEvent.click(screen.getByText('25'));
      expect(screen.queryByText('My last issue')).not.toBeNull();
    });

    it('should be able to change pages', async () => {
      render(
        <IssuesTableWithProviders {...defaultProps} issuesList={issuesList} />
      );

      expect(screen.queryByText('My last issue')).toBeNull();

      await userEvent.click(screen.getByTestId('KeyboardArrowRightIcon'));
      expect(screen.queryByText('My last issue')).not.toBeNull();
    });
  });
});
