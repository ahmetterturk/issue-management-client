import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ff8a80',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const IssueInfo = ({ issueData }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={10} md={4}>
        <Item>{issueData.author}</Item>
      </Grid>
      <Grid item xs={10} md={4}>
        <Item>{issueData.date}</Item>
      </Grid>
      <Grid item xs={10} md={4}>
        <Item>{issueData.status}</Item>
      </Grid>
    </Grid>
  );
};

export default IssueInfo;
