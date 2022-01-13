import React from 'react';
import { Typography } from '@mui/material';
// FormError components is just for error, if there is any
const FormError = ({ errors, errorMessage, classes }) => {
  return (
    <>
    {/* errors props check if there is any errors to show the errorMessage */}
      {errors ? (
        <Typography variant='span' className={classes}>
          {errorMessage}
        </Typography>
      ) : null}
    </>
  );
};

export default FormError;
