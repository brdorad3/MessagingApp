import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';
import { useUserContext } from './userContext';


interface ProtectedRouteProps {
  children: JSX.Element;
}


const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
