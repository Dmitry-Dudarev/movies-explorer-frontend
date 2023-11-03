import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRouteElement({ element: Component, ...props }) {
  return (
    !props.loggedIn ? <Component {...props} /> : <Navigate to='/movies' replace />
  );
};

export default PublicRouteElement;