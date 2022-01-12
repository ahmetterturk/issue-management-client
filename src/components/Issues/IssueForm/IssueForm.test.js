import React from 'react';
import { render, screen, act, within } from '@testing-library/react';
import { IssueFormView } from './IssueForm';
import { WithProviders, mockDispatch } from '../../../testUtils/WithProviders';
import userEvent from '@testing-library/user-event';

const IssueFormWithProviders = WithProviders(IssueFormView);

describe('IssueForm', () => {
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
  it('should render new issue button', () => {
    render(<IssueFormWithProviders {...defaultProps} />);

    expect(screen.getByText('New Issue')).toBeInTheDocument();
  });
  it('should open modal when clicking on the new issue button', async () => {
    const { getByText } = render(<IssueFormWithProviders {...defaultProps} />);

    await userEvent.click(getByText('New Issue'));

    expect(screen.getByText('Create Issue')).toBeInTheDocument();
  });
  it('should show an error message when title is blank', async () => {
    const { getByText, getByLabelText, getByTestId, debug } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    await userEvent.click(getByText('Public'));
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    await userEvent.click(getByText('High'));
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    await userEvent.click(getByText('New'));
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });
    expect(screen.getByText("Title can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when description is blank', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    await userEvent.click(getByText('Public'));
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    await userEvent.click(getByText('High'));
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    await userEvent.click(getByText('New'));
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    expect(screen.getByText("Description can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when type is not selected', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    await userEvent.click(getByText('High'));
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    await userEvent.click(getByText('New'));
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    expect(screen.getByText("Type can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when Priority is not selected', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    await userEvent.click(getByText('Public'));
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    await userEvent.click(getByText('New'));
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    expect(screen.getByText("Priority can't be blank!")).toBeInTheDocument();
  });
  it('should show an error message when Status is not selected', async () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} />
    );

    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    await userEvent.click(getByText('Public'));
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    await userEvent.click(getByText('High'));
    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

    expect(screen.getByText("Status can't be blank!")).toBeInTheDocument();
  });
  it('should create issue successfully', async () => {
    const createIssue = jest.fn().mockResolvedValue();
    const { getByText, getByLabelText, getByTestId } = render(
      <IssueFormWithProviders {...defaultProps} createIssue={createIssue} />
    );

    await userEvent.click(getByText('New Issue'));
    await userEvent.type(getByLabelText('Title'), 'issue-title');
    await userEvent.type(getByLabelText('Description'), 'issue-description');
    await userEvent.click(within(getByTestId('Type')).getByRole('button'));
    await userEvent.click(getByText('Public'));
    await userEvent.click(within(getByTestId('Priority')).getByRole('button'));
    await userEvent.click(getByText('High'));
    await userEvent.click(within(getByTestId('Status')).getByRole('button'));
    await userEvent.click(getByText('New'));

    await act(async () => {
      await userEvent.click(getByText('Create Issue'));
    });

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
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE_COUNTER' });
  });
});
