import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '../../contextReducer/Context';

const Members = ({ issue }) => {
  const { state } = useGlobalContext();
  console.log(issue.members);
  // console.log(state.users.allUsers);
  // console.log(
  //   state.users.allUsers.filter((user) =>
  //     issue.members.includes(`${user.firstName} ${user.lastName}`)
  //   )
  // );

  return (
    <Card>
      <CardContent>
        {issue.members && issue.members.length > 0 && (
          <Typography gutterBottom variant="h5" component="div">
            Issue Members
          </Typography>
        )}

        {issue.members && issue.members.length > 0 ? (
          issue.members.map((member) => {
            return <Typography variant="h6">{member}</Typography>;
          })
        ) : (
          <Typography>Add Members To This Issue</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Members;
