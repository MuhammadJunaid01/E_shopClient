import React from "react";
import { Redirect, Route } from "react-router-dom";
import UseAuth from "./../hooks/useAuth/UseAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = UseAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
