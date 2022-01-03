import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders with no errors', () => {
  render(<App />);
  expect(screen.getByText('Lock Security')).toBeInTheDocument();
});
