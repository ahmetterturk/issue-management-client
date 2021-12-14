import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contextReducer/Context';
import IssuesTable from './IssuesTable/IssuesTable';

const Issues = () => {
  const { state, dispatch } = useGlobalContext();
  const issuesList = state.issues;

  return <IssuesTable issuesList={issuesList} />;
};

export default Issues;
