import React from 'react';
import { InputAdornment, Grid, TextField } from '@mui/material';

const FormInput = ({
  classes,
  register,
  label,
  icons,
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
      </Grid>
    </>
  );
};

export default FormInput;
