import { Navigate } from 'react-router-dom';
import { useAuth } from '/Context/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    // Si no ha iniciado sesión, redirigir al login o home
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== 'ROLE_ADMIN') {
    // Si requiere ser admin y no lo es, denegar acceso
    return <Navigate to="/" replace />;
  }

  return children;
};