import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { IssuesTableView } from './IssuesTable';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const IssuesTableWithProviders = WithProviders(IssuesTableView);

// Tests for IssuesTable module;
describe('IssuesTable', () => {
  // By default we'll have a list of issues with different statuses
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
    // we set the app's state.issuesIsLoading to true
    const IssuesTableWithLoadingIssues = WithProviders(IssuesTableView, {
      state: { issuesIsLoading: true },
    });
    render(<IssuesTableWithLoadingIssues {...defaultProps} />);

    // we expect for a spinner with role progressbar to be in the document
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should render the issue list', async () => {
    render(<IssuesTableWithProviders {...defaultProps} />);

    // we expect for the title of our first issue to be rendered
    expect(
      screen.getByText(defaultProps.issuesList[0].title)
    ).toBeInTheDocument();
  });
  it('should only show public issues for non-admins', async () => {
    // we initialise currentUser.token with a isAdmin=false token
    const IssuesTableWithProviders = WithProviders(IssuesTableView, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });
    render(<IssuesTableWithProviders {...defaultProps} />);

    // we expect for the user to only be able to see public issues (only the 3rd issue is public)
    expect(screen.queryByText(defaultProps.issuesList[0].title)).toBeNull();
    expect(screen.queryByText(defaultProps.issuesList[1].title)).toBeNull();
    expect(screen.queryByText(defaultProps.issuesList[2].title)).not.toBeNull();
  });
  // Tests for when deleting an issue
  describe('when deleting', () => {
    // these tests will only list one issue
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
      // we wait for any rerenders after...
      await act(async () => {
        // we click on the delete icon
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        // we click on the delete button in the delete confirmation
        await userEvent.click(screen.getByText('Delete'));
      });

      // we expect for an INCREASE_COUNTER action to be dispatched
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    });
    it('should log an error message if the deletion fails', async () => {
      // we pass down a deleteIssue that will reject with a specific error and 
      // we spy on console.log
      const expectedError = 'Network Error';
      const deleteIssue = () => Promise.reject(expectedError);
      const consoleLogSpy = jest.spyOn(console, 'log');
      render(
        <IssuesTableWithProviders
          issuesList={issuesList}
          deleteIssue={deleteIssue}
        />
      );
      // we wait for any rerenders after...
      await act(async () => {
        // we click on the delete icon
        await userEvent.click(screen.getByTestId('DeleteIcon'));
        // we click on the delete button in the delete confirmation
        await userEvent.click(screen.getByText('Delete'));
      });

      // we expect for console.log to have been called with our error
      expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
    });
  });

  // Tests for when paginating module;
  describe('when paginating', () => {
    // these test will list 11 issues
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
      // we initially expect for our last issue to not be shown
      expect(screen.queryByText('My last issue')).toBeNull();

      // we click on the rows per page dropdown
      await userEvent.click(screen.getByLabelText('Rows per page:'));
      // and update the value to 25 rows
      await userEvent.click(screen.getByText('25'));

      // we should now expect for the last issue to be shown
      expect(screen.queryByText('My last issue')).not.toBeNull();
    });

    it('should be able to change pages', async () => {
      render(
        <IssuesTableWithProviders {...defaultProps} issuesList={issuesList} />
      );

      // we initially expect for the last issue to not be shown
      expect(screen.queryByText('My last issue')).toBeNull();

      // we then click on the button to show the next page
      await userEvent.click(screen.getByTestId('KeyboardArrowRightIcon'));
      // we now expect for the last issue to be rendered
      expect(screen.queryByText('My last issue')).not.toBeNull();
    });
  });
});
