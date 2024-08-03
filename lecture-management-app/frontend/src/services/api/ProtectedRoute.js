import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../services/api/auth';

export const ProtectedRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const { isLoggedIn, role } = useContext(AuthContext);
  
  if (!isLoggedIn) {
    return <Navigate to="/home" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};
