import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('role');
  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
