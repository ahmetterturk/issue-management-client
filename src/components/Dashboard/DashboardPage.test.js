import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { DashboardPageView } from './DashboardPage';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const DashboardPageViewWithProviders = WithProviders(DashboardPageView);

describe('DashboardPage', () => {
  const defaultProps = {
    useLocation: () => ({
      pathname: '/dashboard',
    }),
  };
  it('should render form title', async () => {
    render(<DashboardPageViewWithProviders {...defaultProps} />);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
    cleanup();
  });
  it('should show a spinner if no users are available', async () => {
    const DashboardPageViewWithNoUsers = WithProviders(DashboardPageView, {
      allUsers: null,
    });
    render(<DashboardPageViewWithNoUsers {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show a spinner if no new issues are available', async () => {
    const DashboardPageViewWithNoNewIssues = WithProviders(DashboardPageView, {
      issues: [{ status: 'Resolved' }, { status: 'Pending' }],
    });
    render(<DashboardPageViewWithNoNewIssues {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show a spinner if no resolved issues are available', async () => {
    const DashboardPageViewWithNoResolvedIssues = WithProviders(
      DashboardPageView,
      {
        issues: [{ status: 'New' }, { status: 'Pending' }],
      }
    );
    render(<DashboardPageViewWithNoResolvedIssues {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should show a spinner if no pending issues are available', async () => {
    const DashboardPageViewWithNoPendingIssues = WithProviders(
      DashboardPageView,
      {
        issues: [{ status: 'New' }, { status: 'Resolved' }],
      }
    );
    render(<DashboardPageViewWithNoPendingIssues {...defaultProps} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
