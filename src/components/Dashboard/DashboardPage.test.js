import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { DashboardPageView } from './DashboardPage';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';

const DashboardPageViewWithProviders = WithProviders(DashboardPageView);

// Tests for DashboardPage component
describe('DashboardPage', () => {
  const defaultProps = {
    useLocation: () => ({
      pathname: '/dashboard',
    }),
  };
  it('should render form title with no errors', async () => {
    render(<DashboardPageViewWithProviders {...defaultProps} />);

    // should successfully dispatch the INCREASE_COUNTER action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    cleanup();
  });
  it('should show a spinner if no users are available', async () => {
    // we set up the test by setting the Context with allUsers as null
    const DashboardPageViewWithNoUsers = WithProviders(DashboardPageView, {
      allUsers: null,
    });
    render(<DashboardPageViewWithNoUsers {...defaultProps} />);

    // we expect a spinner to show which has the role of progressbar
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show a spinner if no new issues are available', async () => {
    // set up test by only showing resolved and pending issues
    const DashboardPageViewWithNoNewIssues = WithProviders(DashboardPageView, {
      issues: [{ status: 'Resolved' }, { status: 'Pending' }],
    });
    render(<DashboardPageViewWithNoNewIssues {...defaultProps} />);

    // we expect a spinner to show which has the role of progressbar
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show a spinner if no resolved issues are available', async () => {
    // set up test by only showing new and pending issues
    const DashboardPageViewWithNoResolvedIssues = WithProviders(
      DashboardPageView,
      {
        issues: [{ status: 'New' }, { status: 'Pending' }],
      }
    );
    render(<DashboardPageViewWithNoResolvedIssues {...defaultProps} />);

    // we expect a spinner to show which has the role of progressbar
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show a spinner if no pending issues are available', async () => {
    // set up test by only showing new and pending resolved
    const DashboardPageViewWithNoPendingIssues = WithProviders(
      DashboardPageView,
      {
        issues: [{ status: 'New' }, { status: 'Resolved' }],
      }
    );
    render(<DashboardPageViewWithNoPendingIssues {...defaultProps} />);

    // we expect a spinner to show which has the role of progressbar
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
