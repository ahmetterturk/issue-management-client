import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GraphsPage from './GraphsPage';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const GraphsPageWithProviders = WithProviders(GraphsPage);

describe('IssueEditForm', () => {
  const defaultProps = {
    issue: {
      title: 'title',
      description: 'description',
      priority: 'priority',
      status: 'status',
      type: 'type',
      userId: 'userId',
      userName: 'userName',
    },
    id: 100,
  };
  it('should render form title', () => {
    render(<GraphsPageWithProviders {...defaultProps} />);

    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Issues By Day')).toBeInTheDocument();
  });
  it('should render an errror if there is no current user', () => {
    const GraphsPageWithProviders = WithProviders(GraphsPage, {
      currentUser: null,
    });
    render(<GraphsPageWithProviders {...defaultProps} />);

    expect(screen.getByText('You need to login first')).toBeInTheDocument();
  });
  it('should render an errror if the user is not an admin', () => {
    const GraphsPageWithProviders = WithProviders(GraphsPage, {
      currentUser: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc0FkbWluIjpmYWxzZSwiaWQiOjEwMH0.qViW2JNrHwectUm0-7Xitc5AskCwvTXixgDh4HNAMRo',
      },
    });
    render(<GraphsPageWithProviders {...defaultProps} />);

    expect(
      screen.getByText('401 You are not authorized to access this page')
    ).toBeInTheDocument();
  });
});
