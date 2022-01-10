import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { useStyles } from './Styles';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

const ResolvedTickets = ({ title, total, subtitle, to }) => {
  const styleProps = {
    borderColor: 'rgba(76, 0, 217, 0.5)',
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
                  backgroundColor: '#4c00d9',
                  height: 56,
                  width: 56,
                }}
              >
                <CloudDoneIcon />
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

export default ResolvedTickets;
