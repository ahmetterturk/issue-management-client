import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Errors = ({
  status,
  title,
  errorMessage,
  imageSrc,
  route,
  btnMessage,
}) => (
  <>
    <Box
      component='main'
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
        marginTop: '50px',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography align='center' color='textPrimary' variant='h3'>
            {status}: {title}
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            {errorMessage}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt='Under development'
              src={imageSrc}
              style={{
                marginTop: 10,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
          <Link to={route} passHref>
            <Button
              component='a'
              startIcon={<ArrowBackIcon fontSize='small' />}
              sx={{ mt: 1 }}
              variant='contained'
            >
              {btnMessage}
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
);

export default Errors;
