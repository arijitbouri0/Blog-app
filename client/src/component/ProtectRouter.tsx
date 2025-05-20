import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectRouterProps {
  children?: React.ReactNode;
  user: boolean; 
  redirect?: string;
}

const ProtectRouter: React.FC<ProtectRouterProps> = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} replace />;
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectRouter;
