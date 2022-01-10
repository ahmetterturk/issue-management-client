import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';

import { Link } from 'react-router-dom';
import { useStyles } from './Styles';

const NewTickets = ({ title, total, subtitle, to }) => {
  const styleProps = {
    borderColor: 'rgba(252, 157, 23, 0.5)',
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
                  backgroundColor: '#fc9d17',
                  height: 56,
                  width: 56,
                }}
              >
                <FiberNewIcon />
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

export default NewTickets;
