import React from 'react';
import { render, screen, act } from '@testing-library/react';
import MembersUpdateDropdown from './MembersUpdateDropdown';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MembersUpdateDropdownWithProviders = WithProviders(MembersUpdateDropdown);

describe('MembersUpdateDropdown', () => {
  const defaultProps = {
    issueData: {
      members: ['John Doe'],
    },
    name: 'John Doe',
  };
  it('should render all options', async () => {
    render(<MembersUpdateDropdownWithProviders {...defaultProps} />);

    await userEvent.click(screen.getByLabelText('Name'));
    await userEvent.click(screen.getByText('Jane Doe'));
    await userEvent.click(screen.getByText('Jane Doe'));
    screen.debug();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ISSUE_UPDATE_MEMBERS',
      data: ['John Doe'],
    });
  });
});
