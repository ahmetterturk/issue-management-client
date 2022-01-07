import { Grid, Typography } from '@mui/material';
import React from 'react';

const issueMembersTable = ({ issueMembers }) => {
  console.log(issueMembers);
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6">Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Email</Typography>
        </Grid>
      </Grid>
      {issueMembers &&
        issueMembers.map((member) => {
          return (
            <Grid container>
              <Grid item xs={6}>
                <Typography>
                  {member.firstName} {member.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{member.email}</Typography>
              </Grid>
            </Grid>
          );
        })}
    </>
  );
};

export default issueMembersTable;
