import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './sidebar';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { createMatchMedia } from '../../testUtils/createMatchMedia';

const SidebarWithProviders = WithProviders(Sidebar);

// Tests for Sidebar component
describe('Sidebar', () => {
  it('should render with no errors', () => {
    render(<SidebarWithProviders />);

    // It should always render the Dashboard item on default context
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should logout', async () => {
    render(<SidebarWithProviders />);
    // we click on logout button
    await userEvent.click(screen.getByText('Log out'));

    // we expect to have dispatched an action
    expect(mockDispatch).toHaveBeenCalled();
  });

  // Tests for smaller screens
  describe('on smaller screens', () => {
    beforeEach(() => {
      // we mock matchMedia to interpret a screen width of 200px
      window.matchMedia = createMatchMedia('200px');
    });

    it('should render on small screens', () => {
      // We render the sidebar with isOpen true to show its content.
      render(<SidebarWithProviders isOpen />);

      // we expect for the sidebar to have the text © Lock Security which is
      // shown in the sidebar
      expect(screen.getByText('© Lock Security')).toBeInTheDocument();
    });
  });
});
