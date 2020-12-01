import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRouteProps, AppState } from '../types'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
