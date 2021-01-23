import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRouteProps, AppState } from '../Types'
import { useSelector } from 'react-redux'

const AdminRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)
  // const { isAdmin } = useSelector((state: AppState) => state.auth.user)
  const isAdmin = true

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
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

export default AdminRoute
