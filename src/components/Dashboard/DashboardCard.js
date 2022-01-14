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

// Dashboard component is a reusable components with different props that can be used to show the data in dashboar page
const DashboardCard = ({
  title,
  total,
  subtitle,
  to,
  icon,
  cardColor,
  iconBgColor,
}) => {
  // style props object is for adding value to the useStyle props for custom css, we can pass this as an arguments to our useStyles
  const styleProps = {
    borderColor: cardColor,
    height: '100%',
    cursor: 'pointer',
  };
  // declare the classes var to assign the useStyles which has all custom css
  const classes = useStyles(styleProps);
  return (
    <Link to={to} className={classes.link}>
      <Card elevation={5} className={classes.border}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color='textSecondary' gutterBottom variant='h4'>
                {title}
              </Typography>
              <Typography color='textPrimary' variant='h5'>
                Total: {total}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: iconBgColor,
                  height: 56,
                  width: 56,
                }}
              >
                {icon}
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

export default DashboardCard;
