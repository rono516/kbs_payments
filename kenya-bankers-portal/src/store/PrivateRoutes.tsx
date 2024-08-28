import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from 'scaling-garbanzo/src/access-control/AuthService.js';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        AuthService.isAuthenticated() ? (
          <Element />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
