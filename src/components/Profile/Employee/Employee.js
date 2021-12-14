import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Container,
  Avatar,
} from '@mui/material';
import useStyles from './Style';
import PersonIcon from '@mui/icons-material/Person';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../../apiServices/ProfileApi';
const Employee = () => {
  const { id } = useParams();
  const [singleEmployee, setSingleEmployee] = useState({});
  const { fullName, dateOfBirth, address, mobilePhone, emergencyContact } =
    singleEmployee;
  const classes = useStyles();
  useEffect(() => {
    getProfile(id)
      .then((data) => setSingleEmployee(data))
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <>
      <Container>
        <Grid
          container
          spacing={3}
          my={5}
          className={classes.employeeContainer}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    src='https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    sx={{
                      height: 200,
                      mb: 2,
                      width: 200,
                    }}
                  />
                  <Typography
                    color='textPrimary'
                    gutterBottom
                    variant='h5'
                    className={classes.wrapIcon}
                  >
                    <PersonIcon className={classes.icon} />
                    {fullName}
                  </Typography>
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    className={classes.wrapIcon}
                    gutterBottom
                  >
                    <ImportContactsIcon className={classes.icon} />
                    {`${address}`}
                  </Typography>
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    className={classes.wrapIcon}
                    gutterBottom
                  >
                    <CakeIcon className={classes.icon} />
                    {dateOfBirth && dateOfBirth.slice(0, 10)}
                  </Typography>
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    className={classes.wrapIcon}
                    gutterBottom
                  >
                    <PhoneAndroidIcon className={classes.icon} />
                    {mobilePhone}
                  </Typography>
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    className={classes.wrapIcon}
                    gutterBottom
                  >
                    <LocalHospitalIcon className={classes.icon} />
                    {emergencyContact}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Employee;
