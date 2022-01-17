import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { IssuesView } from './Issues';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';

const IssuesWithProviders = WithProviders(IssuesView);

// Tests for Issues component
describe('Issues', () => {
  // by default our API.get callback will resolve
  const defaultProps = {
    API: {
      get: () => Promise.resolve({ data: 'data' }),
    },
  };
  it('should render Issues title', () => {
    render(<IssuesWithProviders {...defaultProps} />);

    // We expect for the issues title to always render
    expect(screen.getByText('Issues')).toBeInTheDocument();
  });
  it('should fetch issues successfully', async () => {
    // after resolving promises and all rerenders
    await act(() => {
      render(<IssuesWithProviders {...defaultProps} />);
    });

    // we expect to have dispatched a SET_ISSUESISLOADING action with data = false
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ISSUESISLOADING',
      data: false,
    });
  });
  it('should log an error if the request fails', async () => {
    // we spy on console.log and mock the API.get function
    const expectedError = 'error';
    const API = {
      get: () => Promise.reject(expectedError),
    };
    const consoleLogSpy = jest.spyOn(console, 'log');

    await act(() => {
      render(<IssuesWithProviders {...defaultProps} API={API} />);
    });

    // we expect console.log to have been called with our error
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });

  it('should show an alert when logged in successfully', () => {
    // we initialise the app's state.isLoggedIn with true
    const IssuesWithNoUser = WithProviders(IssuesView, {
      state: {
        isLoggedIn: true,
      },
    });
    render(<IssuesWithNoUser {...defaultProps} />);

    // we expect to show a successful login message
    expect(
      screen.getByText('You have logged in successfully')
    ).toBeInTheDocument();
  });
  it('should show an alert when logged in successfully', () => {
    // we initialise the app's state.isUpdated with true
    const IssuesWithNoUser = WithProviders(IssuesView, {
      state: {
        isUpdated: true,
      },
    });
    render(<IssuesWithNoUser {...defaultProps} />);

    // we expect to show a successful profile update message
    expect(
      screen.getByText('You have updated your profile successfully')
    ).toBeInTheDocument();
  });
});
