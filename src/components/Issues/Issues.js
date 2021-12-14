import React from 'react';
import { useGlobalContext } from '../../contextReducer/Context';
import IssuesTable from './IssuesTable/IssuesTable';

const Issues = () => {
  const { state } = useGlobalContext();
  const issuesList = state.issues;

  return <IssuesTable issuesList={issuesList} />;
};

export default Issues;
