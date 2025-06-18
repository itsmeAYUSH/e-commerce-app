// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../store/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a proper loading component
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute; 

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;