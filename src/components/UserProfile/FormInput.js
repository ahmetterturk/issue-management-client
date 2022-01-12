import React from 'react';
import FormError from './FormError';
import { InputAdornment, Grid, TextField } from '@mui/material';

// FormInput component is for TextFeild(input), with dozen props on different attribute
const FormInput = ({
  className,
  register,
  label,
  icons,
  md,
  xs,
  name,
  type,
  placeholder,
  size,
  errors,
  errorMessage,
  required,
}) => {
  return (
    <>
      {/* using md and xs props to adding the column size  */}
      <Grid item md={md} xs={xs}>
        <TextField
          fullWidth
          // placeholder prop to add a place holder if needed
          placeholder={placeholder}
          // type prop for type input
          type={type}
          // label prop for adding label on input
          label={label}
          // register, name, required, size props to add related data for form react hook form
          {...register(name, { required: required, minLength: size })}
          variant='outlined'
          InputProps={{
            startAdornment: (
              // className prop to add className
              <InputAdornment position='start' className={className}>
                {/* icon prop to add icon in the input */}
                {icons}
              </InputAdornment>
            ),
          }}
        />
        {/* Importing FormError component and using prop driling to pass error, errorMessage and className props to higher component */}
        <FormError
          errors={errors}
          errorMessage={errorMessage}
          classes={className}
        />
      </Grid>
    </>
  );
};

export default FormInput;
