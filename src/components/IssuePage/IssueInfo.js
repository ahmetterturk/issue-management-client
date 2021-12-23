import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ff8a80',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#F6F6F6',
  borderRadius: '15px',
  margin: '10px 0',
  padding: '15px',
}));

const IssueInfo = ({ issue }) => {
  const classes = useStyles();

  return (
    <Grid justifyContent="space-between" container spacing={2}>
      <Grid item xs={6} md={3}>
        <Item className={classes.mutualContainer}>{issue.userId}</Item>
      </Grid>
      <Grid item xs={6} md={3}>
        <Item>{issue.createdAt}</Item>
      </Grid>
      <Grid item xs={6} md={3}>
        <Item>{issue.type}</Item>
      </Grid>
    </Grid>
  );
};

export default IssueInfo;
