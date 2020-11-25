import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ProtectedRouteProps, AppState } from '../types'
import { useSelector } from 'react-redux'

function AdminRoute({ component: Component, ...rest }: ProtectedRouteProps) {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth)
  const { isAdmin } = useSelector((state: AppState) => state.auth.user)
  
  return (
    <Route {...rest} render={(props) =>
      isAuthenticated && isAdmin
        ? ( <Component {...props} />) 
        : (<Redirect to={{pathname: '/login',state: { from: props.location },}}/>)
    }/>
  )
}

export default AdminRoute
