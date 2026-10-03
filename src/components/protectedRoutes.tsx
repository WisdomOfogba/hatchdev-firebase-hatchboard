import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import type { ReactNode } from 'react';


export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
 
  if (loading) return <p>Checking your session...</p>;
  if (!user) return <Navigate to="/login" replace />;
 
  return children;
}
