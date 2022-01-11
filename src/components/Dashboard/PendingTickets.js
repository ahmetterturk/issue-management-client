import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { Link } from 'react-router-dom';
import { useStyles } from './Styles';

const PendingTickets = ({ title, total, subtitle, to }) => {
  const styleProps = {
    borderColor: 'rgba(255, 0, 89, 0.5)',
    height: '100%',
    cursor: 'pointer',
  };
  const classes = useStyles(styleProps);
  return (
    <Link to={to} className={classes.link}>
      <Card elevation={5} className={classes.border}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h4">
                {title}
              </Typography>
              <Typography color="textPrimary" variant="h5">
                Total: {total}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: '#ff0059',
                  height: 56,
                  width: 56,
                }}
              >
                <PendingActionsIcon />
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
            <Typography color="textSecondary" variant="caption">
              {subtitle}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PendingTickets;
