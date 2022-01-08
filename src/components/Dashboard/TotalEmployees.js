import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { useGlobalContext } from '../../contextReducer/Context';
import { Link } from 'react-router-dom';
import { useStyles } from './Styles';

const TotalEmployees = ({ title, total, subtitle, to }) => {
  const { state } = useGlobalContext();
  const classes = useStyles();
  return (
    <Link to={to} className={classes.link}>
      <Card sx={{ height: '100%', cursor: 'pointer' }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color='textSecondary' gutterBottom variant='h3'>
                {title}
              </Typography>
              <Typography color='textPrimary' variant='h5'>
                Total: {total}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: '#00ffbb',
                  height: 56,
                  width: 56,
                }}
              >
                <GroupIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography color='textSecondary' variant='caption'>
              {subtitle}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TotalEmployees;
