import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { WithProviders } from '../../testUtils/WithProviders';
import { createMatchMedia } from '../../testUtils/createMatchMedia';

const NavbarWithProviders = WithProviders(Navbar);

// Tests for Navbar component
describe('Navbar', () => {
  it("should render user's name", () => {
    render(<NavbarWithProviders />);

    // we expect to always render a user greeting
    expect(screen.getByText('Hi John Doe')).toBeInTheDocument();
  });

  // Tests for larger screens (default test behaviour)
  describe('On larger screens', () => {
    it('should not render menu icon', () => {
      render(<NavbarWithProviders />);

      // on larger screens we expect not to render a menu icon
      expect(screen.queryAllByTestId('MenuIcon')).toHaveLength(0);
    });
  });

  // Tests for On smaller screens module;
  describe('On smaller screens', () => {
    beforeEach(() => {
      // we set matchMedia to interpret screen width as 200px
      window.matchMedia = createMatchMedia('200px');
    });
    afterEach(() => {
      delete window.matchMedia;
    });

    it('should render menu icon', () => {
      render(<NavbarWithProviders />);
      // on smaller screens we expect to render a menu icon
      expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
    });
  });
});
