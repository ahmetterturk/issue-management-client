import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

// Tests for App module
describe('App', () => {
  it('renders with no errors', () => {
    act(() => {
      render(<App />);
    });
    expect(screen.getByText('Remember me')).toBeInTheDocument();
  });
});
