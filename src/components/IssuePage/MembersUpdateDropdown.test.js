import React from 'react';
import { render, screen } from '@testing-library/react';
import MembersUpdateDropdown from './MembersUpdateDropdown';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MembersUpdateDropdownWithProviders = WithProviders(MembersUpdateDropdown);

// Tests for MembersUpdateDropdown component
describe('MembersUpdateDropdown', () => {
  // we initialise all tests with John Doe as the sole member of an issue
  const defaultProps = {
    issueData: {
      members: ['John Doe'],
    },
    name: 'John Doe',
  };
  it('should render all options', async () => {
    render(<MembersUpdateDropdownWithProviders {...defaultProps} />);

    // We click on the name dropdown
    await userEvent.click(screen.getByLabelText('Name'));
    // We select the Jane Doe once
    await userEvent.click(screen.getByText('Jane Doe'));
    // we select the Jane Doe user once again.
    await userEvent.click(screen.getByText('Jane Doe'));

    // Given we selected and de-selected Jane Doe we expect for the SET_ISSUE_UPDATE_MEMBERS action to
    // be dispatched with John Doe.
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ISSUE_UPDATE_MEMBERS',
      data: ['John Doe'],
    });
  });
});
