import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'

import { authenticateUser } from '../../redux/actions'

const GoogleUserLogin = () => {
  const GOOGLE_CLIENT =
    (process.env.REACT_APP_GOOGLE_API_KEY as string) ||
    '830151949816-6fdv9tqs8h1e9me2rs2aa5l6h9f57lrd.apps.googleusercontent.com'
  const dispatch = useDispatch()

  const responseSuccessGoogle = (response: any) => {
    const { id_token } = response.tokenObj
    dispatch(authenticateUser(id_token))
  }

  const responseFailGoogle = (response: any) => {
    console.log(response)
  }

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT}
      buttonText='Google Login'
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleUserLogin
