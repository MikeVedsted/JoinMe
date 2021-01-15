import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { ProtectedRouteProps } from '../types'

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [isAuthenticated, setAuthentication] = useState(false)

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get('/api/v1/users/verify-token')
        if (data.message === 'jwt expired') {
          console.log(data)
          removeCookie('user')
          console.log(cookies)
        } else {
          const { user_id, first_name, last_name, profile_image } = data
          setCookie('user', { user_id, first_name, last_name, profile_image })
          setAuthentication(true)
        }
      } catch (error) {
        console.log('Error', error)
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
