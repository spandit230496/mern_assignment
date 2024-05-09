import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoutes = () => {
    const isLoggedInUser = (e) => {
        
        if (!localStorage.getItem("isLoggedIn")) {
            toast.error("Please login to access this page", { position: "top-center" });
            return false;
        } else {
            return true;
        }
    };

    return isLoggedInUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
