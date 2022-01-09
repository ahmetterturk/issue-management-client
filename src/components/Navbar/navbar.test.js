import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { WithProviders } from '../../testUtils/WithProviders';
import { createMatchMedia } from '../../testUtils/createMatchMedia';

const NavbarWithProviders = WithProviders(Navbar);

describe('Navbar', () => {
  it("should render user's name", () => {
    render(<NavbarWithProviders />);

    expect(screen.getByText('Hi John Doe')).toBeInTheDocument();
  });

  describe('On larger screens', () => {
    it('should not render menu icon', () => {
      render(<NavbarWithProviders />);
      expect(screen.queryAllByTestId('MenuIcon')).toHaveLength(0);
    });
  });

  describe('On smaller screens', () => {
    beforeEach(() => {
      window.matchMedia = createMatchMedia('200px');
    });
    afterEach(() => {
      delete window.matchMedia;
    });

    it('should render menu icon', () => {
      render(<NavbarWithProviders />);
      expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
    });
  });
});

