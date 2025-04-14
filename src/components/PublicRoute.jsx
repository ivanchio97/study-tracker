import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="spinner-border" role="status"> </div>
  }

  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;