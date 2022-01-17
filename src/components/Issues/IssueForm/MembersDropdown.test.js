import React from 'react';
import { render, screen } from '@testing-library/react';
import MembersDropdown from './MembersDropdown';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MembersDropdownWithProviders = WithProviders(MembersDropdown);

// Tests for MembersDropdown component
describe('MembersDropdown', () => {
  it('should render all users', async () => {
    const { getByLabelText } = render(<MembersDropdownWithProviders />);

    // we click on the dropdown with label Name
    await userEvent.click(getByLabelText('Name'));

    // we expect to render all default users (Jane Doe and John Doe)
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
  it('should call on change when selecting a user', async () => {
    const { getByLabelText } = render(<MembersDropdownWithProviders />);

    // we click on the dropdown with label Name
    await userEvent.click(getByLabelText('Name'));
    // we select the Jane Doe option
    await userEvent.click(screen.getByText('Jane Doe'));

    // we expect for a SET_ISSUE_MEMBERS action to be dispatched with Jane Doe
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ISSUE_MEMBERS',
      data: ['Jane Doe'],
    });
  });
});
