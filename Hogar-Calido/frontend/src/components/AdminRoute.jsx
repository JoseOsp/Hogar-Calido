import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // Valida si está autenticado y si su rol es administrador
  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;