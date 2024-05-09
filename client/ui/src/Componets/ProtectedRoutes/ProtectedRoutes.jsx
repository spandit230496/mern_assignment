import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoutes = () => {
    const [toastDisplayed, setToastDisplayed] = useState(false);

    const isLoggedInUser = () => {
        if (!localStorage.getItem("isLoggedIn")) {
            if (!toastDisplayed) {
                toast.error("Please login to access this page", { position: "top-left" });
                setToastDisplayed(true); 
            }
            return false;
        } else {
            return true;
        }
    };

    return isLoggedInUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
