import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRouteElement({ element: Component, ...props }) {
  console.log(props.loggedIn)
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace />
  );
};

export default ProtectedRouteElement;