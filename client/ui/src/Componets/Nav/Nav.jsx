import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    LOGO
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Link to="/home" sx={{ textDecoration: "none", color: "inherit" }}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link
                        to="/protected/employeelist"
                        sx={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Button color="inherit">Employee List</Button>
                    </Link>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout} sx={{ textDecoration: "none", color: "white" ,backgroundColor:"red"}}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/" sx={{ textDecoration: "none", color: "inherit" }}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                    
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
