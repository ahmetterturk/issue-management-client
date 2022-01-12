import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Divider,
  CardHeader,
  Typography,
  CardActions,
  CardMedia,
  Button,
  Grid,
  Box,
  Container,
} from '@mui/material';
import jwtdecode from 'jwt-decode';
import { useGlobalContext } from '../../../contextReducer/Context';
import { useStyles } from './EmployeeStyles';
import { deleteUser, singleUser } from '../../../apiServices/UserApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Errors from '../../ErrorPages/Errors';
import moment from 'moment';
import unauthorizedImage from '../../../images/unauthorized.jpg';
import notFoundImage from '../../../images/notFound2.jpg';
import EmployeeAvatar from './EmployeeAvatar';
import DeleteConfirmation from '../../DeleteConfirmation/DeleteConfirmation';
import CircularProgress from '@mui/material/CircularProgress';
const Employee = () => {
  const classes = useStyles();
  const {
    state: {
      currentUser: { token },
    },
    dispatch,
  } = useGlobalContext();
  const decodedToken = jwtdecode(token);
  const { isAdmin } = decodedToken;
  const [isFetching, setIsFetching] = useState(false);
  const { id } = useParams();
  const [hasError, setHasError] = useState(false);
  const [errorObject, setErrorObject] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(true);
    singleUser(id)
      .then((data) => {
        if (data.status === 500) {
          setHasError(true);
          setIsFetching(false);
          setErrorObject(data);
        } else {
          setUser(data.singleUser);
          setHasError(false);
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(errorObject);
  const handleDelete = (id) => {
    deleteUser(id)
      .then((data) => {
        console.log(data);
        dispatch({ type: 'INCREASE_COUNTER' });
        navigate('/employee');
      })
      .catch((err) => console.log(err));
  };

  if (!isAdmin) {
    return (
      <Errors
        status='401'
        title='You are not authorized to access this page'
        errorMessage='You either tried to access the unauthorized route or you came here by mistake.
      Whichever it is, try using the navigation'
        route='/issues'
        imageSrc={unauthorizedImage}
        btnMessage='Back to main page'
      />
    );
  }
  if (hasError) {
    return (
      <Errors
        status='404'
        title='There is no user with current id in our server'
        errorMessage='Please make sure the user exist'
        route='/issues'
        imageSrc={notFoundImage}
        btnMessage='Back to main page'
      />
    );
  }

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 8,
        mt: 10,
      }}
    >
      <Container maxWidth='lg'>
        <Typography sx={{ mb: 3 }} variant='h4' textAlign={'center'}>
          Employee
        </Typography>

        {isFetching ? (
          <Box
            component='main'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <EmployeeAvatar image={user.imageUrl} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Card className={classes.employeeDetails} elevation={5}>
                <CardHeader subheader='Details' title='User' />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Typography
                        variant='h5'
                        sx={{ mb: 3 }}
                        className={classes.employeeTypo}
                      >
                        Name: {`${user.firstName} ${user.lastName}`}
                      </Typography>
                      <Typography
                        variant='h5'
                        sx={{ mb: 3 }}
                        className={classes.employeeTypo}
                      >
                        Email: {user.email}
                      </Typography>
                      <Typography
                        variant='h5'
                        sx={{ mb: 3 }}
                        className={classes.employeeTypo}
                      >
                        Role: {user.isAdmin ? 'Admin' : 'Employee'}
                      </Typography>
                      <Typography
                        variant='h5'
                        sx={{ mb: 3 }}
                        className={classes.employeeTypo}
                      >
                        Hire Date: {moment(user.createdAt).format('LL')}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}
                  >
                    {isAdmin && (
                      <DeleteConfirmation
                        handleDelete={() => handleDelete(id)}
                      />
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Employee;
