import React from 'react';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useGlobalContext } from '../../contextReducer/Context';
import { Link, useNavigate } from 'react-router-dom';
import { useStyles } from './Styles';

const TotalTickets = ({ title, total, subtitle, to }) => {
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
                  backgroundColor: '#1c79fc',
                  height: 56,
                  width: 56,
                }}
              >
                <AppRegistrationIcon />
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

export default TotalTickets;
