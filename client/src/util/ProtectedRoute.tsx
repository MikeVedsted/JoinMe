import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ProtectedRouteProps, AppState } from "../types";
import { useSelector } from "react-redux";

function ProtectedRoute({
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  let { isAuthenticated } = useSelector((state: AppState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
