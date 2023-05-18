/**
 * @file ProtectedRoute.jsx
 *
 * @description This file serves to restric access to unverified users by redirecting to home page
 * or allow access to verified users.
 * 
 * @requires useAuth
 * @requires Navigate
 *
 * @requires react
 */



import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const {currentUser} = useAuth();
    if(!currentUser){
        alert("Redirecting to loginpage. Please Login");
        return <Navigate to='/'></Navigate>;
    }
    return children;
};

export default ProtectedRoute;