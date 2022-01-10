import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './sidebar';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';
import { createMatchMedia } from '../../testUtils/createMatchMedia';

const SidebarWithProviders = WithProviders(Sidebar);

describe('Sidebar', () => {
  it('should render with no errors', () => {
    render(<SidebarWithProviders />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should logout', async () => {
    render(<SidebarWithProviders />);
    await userEvent.click(screen.getByText('Log out'));
    expect(mockDispatch).toHaveBeenCalled();
  });

  describe('on smaller screens', () => {
    beforeEach(() => {
      window.matchMedia = createMatchMedia('200px');
    });

    it('should render on small screens', () => {
      render(<SidebarWithProviders isOpen />);
      expect(screen.getByText('© Lock Security')).toBeInTheDocument();
    });
  });
});
