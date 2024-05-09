import React, { useEffect, useState } from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
   const User=JSON.parse(localStorage.getItem("isLoggedIn"))
   const [user, setUser] = useState(User["data"]["name"]||"User");


  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '50px' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Our Website,{user}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Explore our services and features
      </Typography>
      <Button variant="contained" component={Link} to="/login" sx={{ marginRight: '10px' }}>
        Login
      </Button>
      <Button variant="contained" component={Link} to="/register">
        Register
      </Button>
    </Container>
  );
};

export default Home;
