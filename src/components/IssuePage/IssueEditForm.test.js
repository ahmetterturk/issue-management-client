import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IssueEditFormView } from './IssueEditForm';
import { WithProviders, mockDispatch } from '../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const IssueEditFormWithProviders = WithProviders(IssueEditFormView);

// Tests for IssueEditForm component
describe('IssueEditForm', () => {
  // all tests will include a single issue with the following details
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

    // We expect for the edit issue button to always be rendered
    expect(screen.getByText('Edit Issue')).toBeInTheDocument();
  });

  it('should show an error when issue title is empty', async () => {
    render(<IssueEditFormWithProviders {...defaultProps} />);

    // we click on the edit issue button
    await userEvent.click(screen.getByText('Edit Issue'));

    // we change the value of the title input to empty string
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: '' } });

    // we click on the Update Issue button
    await userEvent.click(screen.getByText('Update Issue'));

    // We expect for an error message to be shown
    expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
  });
  it('should show an error when issue description is empty', async () => {
    render(<IssueEditFormWithProviders {...defaultProps} />);
    // we click on the edit issue button
    await userEvent.click(screen.getByText('Edit Issue'));

    // we change the value of the description input to empty string
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: '' },
    });

    // we click on the Update Issue button
    await userEvent.click(screen.getByText('Update Issue'));

    // We expect for an error message to be shown
    expect(screen.getByText("Description can't be blank")).toBeInTheDocument();
  });

  it('should update the issue successfully', async () => {
    // we pass down an updateIssue callback that will resolve
    const updateIssue = () => Promise.resolve();
    render(
      <IssueEditFormWithProviders {...defaultProps} updateIssue={updateIssue} />
    );

    // we click on the edit issue button
    await userEvent.click(screen.getByText('Edit Issue'));

    // We type in all the relevant fields
    userEvent.type(screen.getByLabelText('Title'), 'New shiny title');
    userEvent.type(
      screen.getByLabelText('Description'),
      'New shiny description'
    );

    // we click on the update issue button
    await userEvent.click(screen.getByText('Update Issue'));

    // we expect for 2 actions to be dispatched successfully
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('should log an error when the issue is not updated', async () => {
    // we pass down an updateIssue callback that will reject and spy on console.log
    const expectedError = 'some-error';
    const consoleLogSpy = jest.spyOn(console, 'log');
    const updateIssue = () => Promise.reject(expectedError);
    render(
      <IssueEditFormWithProviders {...defaultProps} updateIssue={updateIssue} />
    );

    // We click on the edit issue button
    await userEvent.click(screen.getByText('Edit Issue'));

    // we click on the update issue button
    await userEvent.click(screen.getByText('Update Issue'));

    // we expect for the console.log spy to be called with our error
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedError);
  });
});
