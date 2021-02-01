import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { clearErrors } from '../redux/actions/error'
import { verifyToken } from '../redux/actions/auth'
import { ProtectedRouteProps, AppState } from '../Types'

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)
  const user = useSelector((state: AppState) => state.user)

  useEffect(() => {
    dispatch(clearErrors())
    dispatch(verifyToken())
  }, [location.pathname, dispatch])

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          isAuthenticated && <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/get-started' }} />
        )
      }
    />
  )
}

export default ProtectedRoute
