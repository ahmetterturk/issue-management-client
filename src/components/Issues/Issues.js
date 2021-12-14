import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../contextReducer/Context';

const Issues = () => {
  const { state, dispatch } = useGlobalContext();

  const issuesList = state.issues;

  console.log(issuesList);

  return (
    <div>
      {issuesList.map((issue) => {
        return (
          <div>
            <h2>{issue.title}</h2>
            <Link to={issue._id}>View Issue</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Issues;
