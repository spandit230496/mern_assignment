import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import BASE_URL from "../../baseURL";
import { toast } from 'react-toastify';

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email && password) {
          try{
           const result= await fetch(`${BASE_URL}/user/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
            const data = await result.json();
            toast(data.data.message);
            console.log(data);
            if(data.success==true){ 
              localStorage.setItem("isLoggedIn",JSON.stringify(data));
              navigate("/home");
             }
           
          }
          catch(error){
           toast(error)
          }
        } else {
            toast("Please enter username and password");
        }
    };

    return (
        <Container maxWidth="xs">
            <div>
                <Typography variant="h4">Login</Typography>
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>

                <Typography variant="body1">
                    not signed in? <Link href="/register">Register Here</Link>
                </Typography>
            </div>
        </Container>
    );
};

export default Login;
