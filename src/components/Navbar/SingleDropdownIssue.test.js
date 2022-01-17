import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleDropdownIssue from './SingleDropdownIssue';
import { WithProviders } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const SingleDropdownIssueWithProviders = WithProviders(SingleDropdownIssue);

// Tests for SingleDropdownIssue component
describe('SingleDropdownIssue', () => {
  const defaultProps = {
    issue: {
      title: 'issue-title',
      updatedAt: '2022-01-11T13:33:35.645Z',
    },
  };
  it('should render the issue title', () => {
    render(<SingleDropdownIssueWithProviders {...defaultProps} />);

    // we expect to always render the issue title
    expect(screen.getByText('issue-title')).toBeInTheDocument();
  });
  it('should call handleClose when clicking on the menu item', async () => {
    // we create a handleClose stub to validate if it's ever called
    const handleClose = jest.fn();
    render(
      <SingleDropdownIssueWithProviders
        {...defaultProps}
        handleClose={handleClose}
      />
    );
    // we click on the bell menu item
    await userEvent.click(screen.getByRole('menuitem'));

    // we expect our handleClose callback to have been called.
    expect(handleClose).toHaveBeenCalled();
  });
});
