import React from 'react';
import { Typography } from '@mui/material';
const FormError = ({ errors, errorMessage, classes }) => {
  return (
    <>
      {errors ? (
        <Typography variant='span' className={classes}>
          {errorMessage}
        </Typography>
      ) : null}
    </>
  );
};

export default FormError;
