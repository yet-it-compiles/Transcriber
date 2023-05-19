/**
 * @file ProtectedRoute.jsx
 *
 * @description This file serves to restrict access to unverified users by
 * redirecting to them home page or allow access to verified users.
 *
 * @requires react
 * @requires react-router-dom
 * @requires context/AuthContext
 *
 * @exports ProtectedRoute
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    alert("Redirecting to loginpage. Please Login");
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
