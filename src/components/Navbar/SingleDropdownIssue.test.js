import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleDropdownIssue from './SingleDropdownIssue';
import { WithProviders } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const SingleDropdownIssueWithProviders = WithProviders(SingleDropdownIssue);

describe('SingleDropdownIssue', () => {
  const defaultProps = {
    issue: {
      title: 'issue-title',
      updatedAt: '2022-01-11T13:33:35.645Z',
    },
  };
  it('should render the issue title', () => {
    render(<SingleDropdownIssueWithProviders {...defaultProps} />);

    expect(screen.getByText('issue-title')).toBeInTheDocument();
  });
  it('should call handleClose when clicking on the menu item', async () => {
    const handleClose = jest.fn();
    render(
      <SingleDropdownIssueWithProviders
        {...defaultProps}
        handleClose={handleClose}
      />
    );
    await userEvent.click(screen.getByRole('menuitem'));
    expect(handleClose).toHaveBeenCalled();
  });
});
