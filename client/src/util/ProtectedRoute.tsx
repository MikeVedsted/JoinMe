import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { ProtectedRouteProps } from '../types'

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const [cookies, setCookies] = useCookies(['user'])
  const [isAuthenticated, setAuthentication] = useState(false)

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(`/api/v1/users/verify-token`)
        if (data.message && new Date(data.message.expiredAt) < new Date()) {
          const res = await axios.get(`/api/v1/users/refresh-token`)
          const { user_id, first_name, last_name, profile_image } = res.data
          setCookies('user', { user_id, first_name, last_name, profile_image })
          setAuthentication(true)
        } else {
          setAuthentication(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserInfo()
  }, [])

  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.user ? (
          isAuthenticated && <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/get-started' }} />
        )
      }
    />
  )
}

export default ProtectedRoute
