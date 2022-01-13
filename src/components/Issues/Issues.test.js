import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { IssuesView } from './Issues';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';

const IssuesWithProviders = WithProviders(IssuesView);

describe('Issues', () => {
  const defaultProps = {
    API: {
      get: () => Promise.resolve({ data: 'data' }),
    },
  };
  it('should render Issues title', () => {
    render(<IssuesWithProviders {...defaultProps} />);

    expect(screen.getByText('Issues')).toBeInTheDocument();
  });
  it('should fetch issues successfully', async () => {
    await act(() => {
      render(<IssuesWithProviders {...defaultProps} />);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_ISSUESISLOADING',
      data: false,
    });
  });
  it('should log an error if the request fails', async () => {
    const expectedError = 'error';
    const API = {
      get: () => Promise.reject(expectedError),
    };
    const consoleLogSpy = jest.spyOn(console, 'log');

    await act(() => {
      render(<IssuesWithProviders {...defaultProps} API={API} />);
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
  it('should show an error if the user is not logged in', () => {
    const IssuesWithNoUser = WithProviders(IssuesView, {
      currentUser: null,
    });
    render(<IssuesWithNoUser {...defaultProps} />);

    expect(
      screen.getByText(
        'You cannot access the application unless you login first'
      )
    ).toBeInTheDocument();
  });
  it('should show an alert when logged in successfully', () => {
    const IssuesWithNoUser = WithProviders(IssuesView, {
      state: {
        isLoggedIn: true,
      },
    });
    render(<IssuesWithNoUser {...defaultProps} />);

    expect(
      screen.getByText('You have logged in successfully')
    ).toBeInTheDocument();
  });
  it('should show an alert when logged in successfully', () => {
    const IssuesWithNoUser = WithProviders(IssuesView, {
      state: {
        isUpdated: true,
      },
    });
    render(<IssuesWithNoUser {...defaultProps} />);

    expect(
      screen.getByText('You have updated your profile successfully')
    ).toBeInTheDocument();
  });
});
