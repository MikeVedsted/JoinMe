import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRouteProps, AppState } from '../types'
import { useCookies } from 'react-cookie'

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const [cookies, setCookies] = useCookies(['user'])
  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}

export default ProtectedRoute
