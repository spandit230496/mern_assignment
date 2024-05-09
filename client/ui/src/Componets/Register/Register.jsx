import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import BASE_URL from "../../baseURL";
import { toast } from 'react-toastify';
const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {

    if (name && password && email) {
      try{
        const response = await fetch(`${BASE_URL}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password,email }),
        });
        const data = await response.json();
        toast(data.message);
        if(data.success==true){
        navigate("/")}
        
      }
      catch(error){ 
        toast(error)
      }

    } else {
      alert("Please enter valid username and password");
    }
  };

  
  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4">Register</Typography>
        <TextField
          label="name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>

        <Typography variant="body1">
                   Already Signed In? <Link href="/">Login Here</Link>
                </Typography>
      </div>
    </Container>
  );
};

export default Register
