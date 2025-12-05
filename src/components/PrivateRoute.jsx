import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  
  // If authenticated, render the nested component via <Outlet /> (Dashboard, Profile, etc.)
  // If not authenticated, redirect to the login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;