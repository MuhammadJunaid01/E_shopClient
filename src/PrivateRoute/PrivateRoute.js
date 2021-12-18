import React from "react";
import { Redirect, Route } from "react-router-dom";
import UseAuth from "./../hooks/useAuth/UseAuth";
import { Spinner } from "react-bootstrap";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLogin } = UseAuth();
  return isLogin ? (
    <div className="loader">
      <Spinner
        style={{ padding: "30px", fontWeight: "600", fontSize: "30px" }}
        animation="border"
        variant="warning"
      />
    </div>
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
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
