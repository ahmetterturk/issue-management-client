import React from 'react';
import { render, screen, act, within } from '@testing-library/react';
import { IssueFormView } from './IssueForm';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const IssueFormWithProviders = WithProviders(IssueFormView);

// Tests for IssueForm component
describe('IssueForm', () => {
  jest.setTimeout(10000);
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
  it('should render new issue button with no errors', () => {
    render(<IssueFormWithProviders {...defaultProps} />);

    // we expect for the new issue button to always render
    expect(screen.getByText('New Issue')).toBeInTheDocument();
  });
  it('should open modal when clicking on the new issue button', async () => {
    const { getByText } = render(<IssueFormWithProviders {...defaultProps} />);

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));

    // we expect for the create issue button to be shown (form opened)
    expect(screen.getByText('Create Issue')).toBeInTheDocument();
  });
  it('should show an error message when title is blank', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));
    // we type in the description
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    // we open the type dropdown
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    // and select the Public option
    await userEvent.click(getByText('Public'));
    // we open the priority dropdown
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    // we select the High option
    await userEvent.click(getByText('High'));
    // we open the status dropdown
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    // we select the New option
    await userEvent.click(getByText('New'));
    // we click on the create issue button and wait for any rerenders
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });
    // we should expect an error informing that the title can't be blank
    expect(screen.getByText("Title can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when description is blank', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    // we open the type dropdown
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    // and select the Public option
    await userEvent.click(getByText('Public'));
    // we open the priority dropdown
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    // we select the High option
    await userEvent.click(getByText('High'));
    // we open the status dropdown
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    // we select the New option
    await userEvent.click(getByText('New'));
    // we click on the create issue button and wait for any rerenders
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    // we should expect an error informing that the description can't be blank
    expect(screen.getByText("Description can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when type is not selected', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    // we type in the description
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    // we open the priority dropdown
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    // we select the High option
    await userEvent.click(getByText('High'));
    // we open the status dropdown
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    // we select the New option
    await userEvent.click(getByText('New'));
    // we click on the create issue button and wait for any rerenders
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    // we should expect an error informing that the Type can't be blank
    expect(screen.getByText("Type can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when Priority is not selected', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    // we type in the description
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    // we open the type dropdown
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    // and select the Public option
    await userEvent.click(getByText('Public'));
    // we open the status dropdown
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    // we select the New option
    await userEvent.click(getByText('New'));
    // we click on the create issue button and wait for any rerenders
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    // we should expect an error informing that the Priority can't be blank
    expect(screen.getByText("Priority can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when Status is not selected', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    // we type in the description
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    // we open the type dropdown
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    // and select the Public option
    await userEvent.click(getByText('Public'));
    // we open the priority dropdown
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    // we select the High option
    await userEvent.click(getByText('High'));
    // we click on the create issue button and wait for any rerenders
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    // we should expect an error informing that the Status can't be blank
    expect(screen.getByText("Status can't be blank!")).toBeInTheDocument();
  });
  it('should create issue successfully', async () => {
    const createIssue = jest.fn().mockResolvedValue();
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} createIssue={createIssue} />
    );

    // we click on the new issue button
    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    // we type in the description
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    // we open the type dropdown
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    // and select the Public option
    await userEvent.click(getByText('Public'));
    // we open the priority dropdown
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    // we select the High option
    await userEvent.click(getByText('High'));
    // we open the status dropdown
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    // we select the New option
    await userEvent.click(getByText('New'));

    // we click on the create issue button and wait for any rerenders
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    // we expect for the createIssue callback to be called with all the selected/typed fields
    expect(createIssue).toHaveBeenCalledWith({
      description: 'issue-description',
      members: undefined,
      priority: 'High',
      status: 'New',
      title: 'issue-title',
      type: 'Public',
      userId: 100,
      userName: 'John Doe',
    });
    // we also expect for an INCREASE_COUNTER action to be fired
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
  });
});
