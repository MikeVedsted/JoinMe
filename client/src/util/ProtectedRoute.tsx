import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { ProtectedRouteProps } from '../types'

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
