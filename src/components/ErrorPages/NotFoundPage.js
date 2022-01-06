import React from 'react';
import { Grid, Typography, Button, CardMedia } from '@mui/material';
import image from '../../images/NicePng_bosch-logo-png_9349735.png';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      sx={{ marginTop: '100px', padding: '20px' }}
      alignItems='center'
    >
      <Grid item xs={12} md={6} lg={6}>
        <Typography variant='h2'>Page Not found</Typography>
        <Typography variant='p'>
          Please choose the correct page from sidebar
        </Typography>
        <Link to='/issues' className={classes.notFoundBtn}>
          Back
        </Link>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CardMedia image={image} title='Erro image' />
        <img src={image} alt='' className={classes.errorImage} />
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
