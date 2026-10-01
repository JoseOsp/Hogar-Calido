import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Asegúrate de que la carpeta se llame 'context' en minúscula

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
};