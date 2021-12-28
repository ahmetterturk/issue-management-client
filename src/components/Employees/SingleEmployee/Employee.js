import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
  Box,
} from '@mui/material';

import { useStyles } from './EmployeeStyles';
import { singleUser } from '../../../apiServices/UserApi';
import { useParams } from 'react-router-dom';
const Employee = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    singleUser(id)
      .then((data) => setUser(data.singleUser))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(user);
  return (
    <>
      <Card sx={{ maxWidth: 450 }} className={classes.card}>
        <CardMedia
          component='img'
          height='250'
          image={user.imageUrl}
          alt={user.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Name: {user.name}
          </Typography>
          <Typography variant='p' color='text.secondary'>
            Email: {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' style={{ color: 'red' }}>
            Delete
          </Button>
          <Button size='small'>Edit</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Employee;
