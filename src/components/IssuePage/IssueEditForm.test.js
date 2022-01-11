import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IssueEditFormView } from './IssueEditForm';
import {
  WithProviders,
  mockDispatch,
} from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event'

const IssueEditFormWithProviders = WithProviders(IssueEditFormView);

describe('IssueEditForm', () => {
  const defaultProps = {
    issue: {
      title: 'title',
      description: 'description',
      priority: 'priority',
      status: 'status',
      type: 'type',
      userId: 'userId',
      userName: 'userName',
    },
    id: 100,
  };
  it('should render form title', () => {
    render(<IssueEditFormWithProviders {...defaultProps} />);

    expect(screen.getByText('Edit Issue')).toBeInTheDocument();
  });


  it('should show an error when issue title is empty', async () => {
    render(<IssueEditFormWithProviders {...defaultProps} />);
    await userEvent.click(screen.getByText('Edit Issue'));

    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: '' } });

    await userEvent.click(screen.getByText('Update Issue'));

    expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
  });
  it('should show an error when issue description is empty', async () => {
    render(<IssueEditFormWithProviders {...defaultProps} />);
    await userEvent.click(screen.getByText('Edit Issue'));

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: '' } });

    await userEvent.click(screen.getByText('Update Issue'));

    expect(screen.getByText("Description can't be blank")).toBeInTheDocument();
  });

  it('should update the issue successfully', async () => {
    const updateIssue = () => Promise.resolve();
    render(
      <IssueEditFormWithProviders {...defaultProps} updateIssue={updateIssue} />
    );
    await userEvent.click(screen.getByText('Edit Issue'));

    userEvent.type(screen.getByLabelText('Title'), 'New shiny title');
    userEvent.type(
      screen.getByLabelText('Description'),
      'New shiny description'
    );

    await userEvent.click(screen.getByText('Update Issue'));

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('should log an error when the issue is not updated', async () => {
      const expectedError = 'some-error'
      const consoleLogSpy = jest.spyOn(console, 'log');
    const updateIssue = () => Promise.reject(expectedError);
    render(
      <IssueEditFormWithProviders {...defaultProps} updateIssue={updateIssue} />
    );
    await userEvent.click(screen.getByText('Edit Issue'));
    await userEvent.click(screen.getByText('Update Issue'));

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
