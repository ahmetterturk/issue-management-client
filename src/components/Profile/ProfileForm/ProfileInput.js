import React from 'react';
import { InputAdornment, Grid, TextField, Typography } from '@mui/material';

const ProfileInput = ({
  classes,
  register,
  label,
  errors,
  icons,
  errorMessage,
  md,
  xs,
  name,
  type,
  placeholder,
  size,
}) => {
  return (
    <>
      <Grid item md={md} xs={xs}>
        <TextField
          fullWidth
          placeholder={placeholder}
          type={type}
          label={label}
          {...register(name, { required: true, minLength: size })}
          variant='filled'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className={classes}>
                {icons}
              </InputAdornment>
            ),
          }}
        />
        {errors.fullName && (
          <Typography variant='span' style={{ color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default ProfileInput;
