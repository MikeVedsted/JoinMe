import React, { useEffect } from 'react'
import axios from 'axios'
import { Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { ProtectedRouteProps } from '../types'

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const [cookies, setCookies] = useCookies(['user'])

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(`/api/v1/users/verify-token`)
        if (data.message && new Date(data.message.expiredAt) < new Date()) {
          console.log('Refreshing...')
          const res = await axios.get(`/api/v1/users/refresh-token`)
          const { user_id, first_name, last_name, profile_image } = res.data
          setCookies('user', { user_id, first_name, last_name, profile_image })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserInfo()
  }, [cookies.user.user_id])

  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/get-started' }} />
        )
      }
    />
  )
}

export default ProtectedRoute
