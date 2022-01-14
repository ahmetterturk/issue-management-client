import React, { useEffect, useState } from 'react';
import jwtdecode from 'jwt-decode';
import { useGlobalContext } from '../../../contextReducer/Context';
import { useStyles } from './EmployeeStyles';
import { deleteUser, singleUser } from '../../../apiServices/UserApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Errors from '../../ErrorPages/Errors';
import moment from 'moment';
import unauthorizedImage from '../../../images/unauthorized.jpg';
import notFoundImage from '../../../images/notFound2.jpg';
import EmployeeAvatar from './EmployeeAvatar';
import DeleteConfirmation from '../../DeleteConfirmation/DeleteConfirmation';
import {
  Card,
  CardContent,
  Divider,
  CardHeader,
  Typography,
  CardActions,
  Grid,
  Box,
  Container,
  CircularProgress,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CardMedia from '@mui/material/CardMedia';

export const EmployeeView = ({ deleteUser, singleUser }) => {
  const theme = useTheme();

  // declaring classes to assign useStyles to use custom css
  const classes = useStyles();
  // destructuring token from currentUser state, also getting dispatch from globalContext
  const {
    state: {
      currentUser: { token },
    },
    dispatch,
  } = useGlobalContext();
  // decoding the token with jwtDeocde to get token properties
  const decodedToken = jwtdecode(token);
  // destructuring isAdmin from decodedToken
  const { isAdmin } = decodedToken;
  // set state for isFetching, to set to true on action to render spinner
  const [isFetching, setIsFetching] = useState(false);
  // destructuring id from useParams react router dom, to use it for fetching singleUser
  const { id } = useParams();
  // set state for has error, if any request or action has error will show the error page or message
  const [hasError, setHasError] = useState(false);
  // initiate errorObject state to null, if there is any error return on request we can assing
  const [errorObject, setErrorObject] = useState(null);
  // set state for user to set user when make a request on single user
  const [user, setUser] = useState([]);
  // using useNavigate to redirect to different rotuer after deleting employee/user
  const navigate = useNavigate();

  useEffect(() => {
    // set isFetching to true
    setIsFetching(true);
    // call singleUser from userApi services and pass the is from usePrams which comes from url to fetch signle user
    singleUser(id)
      .then((data) => {
        // check if the data status that comming from request is 500
        if (data.status === 500) {
          // set hasError to true and and set isFethcing to false and also pass the current data to the errorObject
          setHasError(true);
          setIsFetching(false);
          setErrorObject(data);
          // if status not 500, means its successfull
        } else {
          // set state of user by passing the return data from reuqest
          setUser(data.singleUser);
          // set hasError will be false
          setHasError(false);
          // set isFetching will be false to stop rendering the spinner
          setIsFetching(false);
        }
      })
      .catch((err) => console.log(err));
    // using id as a dependency to rerender every time id gets change
  }, [id]);

  // handleDelete function will delete user
  const handleDelete = (id) => {
    // makign a delete request by calling deleteUser form userApi services and passing current id
    deleteUser(id)
      .then((data) => {
        console.log(data);
        // dispathch to increase the counter state, which has been used as a dependency on useEffect to fetch all users in App comp
        dispatch({ type: 'INCREASE_COUNTER' });
        // after deleting redirect to the eomployees page
        navigate('/employee');
      })
      .catch((err) => console.log(err));
  };
  // chekc if current user is not admin render the Errors cmponents with unauthorized error message with instruction to navigate back
  if (!isAdmin) {
    return (
      <Errors
        status="401"
        title="You are not authorized to access this page"
        errorMessage="You either tried to access the unauthorized route or you came here by mistake.
      Whichever it is, try using the navigation"
        route="/issues"
        imageSrc={unauthorizedImage}
        btnMessage="Back to main page"
      />
    );
  }
  // check if hasError is true, to render Errors comonents with 404 status code, and message that user wiht current id is not exist in our server
  if (hasError) {
    return (
      <Errors
        status="404"
        title="There is no user with current id in our server"
        errorMessage="Please make sure the user exist"
        route="/issues"
        imageSrc={notFoundImage}
        btnMessage="Back to main page"
      />
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* <Typography sx={{ mb: 10 }} variant="h4" textAlign={'center'}>
          {`${user.firstName} ${user.lastName}`}
        </Typography> */}

        {isFetching ? (
          <Box
            component="main"
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
            <Grid item xs={12}>
              <Typography sx={{ mb: 5 }} variant="h3" textAlign={'center'}>
                {`${user.firstName} ${user.lastName}`}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <EmployeeAvatar image={user.imageUrl} />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Card className={classes.employeeDetails} elevation={5}>
                <CardHeader title="Employee Details" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        fontSize={15}
                        sx={{
                          display: 'inline-block',
                          borderBottom: '1px solid #c4c4c4',
                        }}
                      >
                        Name
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        fontSize={18}
                      >
                        {`${user.firstName} ${user.lastName}`}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        fontSize={15}
                        sx={{
                          display: 'inline-block',
                          borderBottom: '1px solid #c4c4c4',
                        }}
                      >
                        Email
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        fontSize={18}
                      >
                        {user.email}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        fontSize={15}
                        sx={{
                          display: 'inline-block',
                          borderBottom: '1px solid #c4c4c4',
                        }}
                      >
                        Role
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        fontSize={18}
                      >
                        {user.isAdmin ? 'Admin' : 'Employee'}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        fontSize={15}
                        sx={{
                          display: 'inline-block',
                          borderBottom: '1px solid #c4c4c4',
                        }}
                      >
                        Hire Date
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        fontSize={18}
                      >
                        {moment(user.createdAt).format('LL')}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                {/* <CardActions>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}
                  >
                    {isAdmin && (
                      <DeleteConfirmation
                        handleDelete={() => handleDelete(id)}
                        entity="employee"
                      />
                    )}
                  </Box>
                </CardActions> */}
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

const Employee = (props) => (
  <EmployeeView
    deleteUser={deleteUser}
    singleUser={singleUser}
    {...props}
  ></EmployeeView>
);
export default Employee;
