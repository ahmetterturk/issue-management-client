import React from 'react';
import { render, screen, act, within } from '@testing-library/react';
import MembersDropdown from './MembersDropdown';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const MembersDropdownWithProviders = WithProviders(MembersDropdown);

describe('MembersDropdown', () => {
  it('should render all users', async () => {
    const { getByLabelText } = render(<MembersDropdownWithProviders />);

    await userEvent.click(getByLabelText('Name'));
    screen.debug();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
  it('should call on change when selecting a user', async () => {
    const { getByLabelText } = render(<MembersDropdownWithProviders />);

    await userEvent.click(getByLabelText('Name'));
    await userEvent.click(screen.getByText('Jane Doe'));
    screen.debug();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ISSUE_MEMBERS',
      data: ['Jane Doe'],
    });
  });
});
