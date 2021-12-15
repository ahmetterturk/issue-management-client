import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssueForm from './IssueForm/IssueForm';
import IssuesTable from './IssuesTable/IssuesTable';

const Issues = () => {
  const { state } = useGlobalContext();
  const issuesList = state.issues;

  return (
    <>
      <IssueForm />
      <IssuesTable issuesList={issuesList} />;
    </>
  );
};

export default Issues;
