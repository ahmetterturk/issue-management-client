import React from 'react';

const Members = ({ issue }) => {
  // console.log(issue.members);

  return (
    <>
      {issue.members &&
        issue.members.map((member) => {
          return <p>{member}</p>;
        })}
    </>
  );
};

export default Members;
