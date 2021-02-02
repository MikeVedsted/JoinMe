import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'

import { authenticateUser } from '../../redux/actions'

const GoogleUserLogin = () => {
  const GOOGLE_CLIENT = process.env.GOOGLE_CLIENT_ID as string
  const dispatch = useDispatch()

  const responseSuccessGoogle = (response: any) => {
    const { id_token } = response.tokenObj
    dispatch(authenticateUser(id_token))
  }

  const responseFailGoogle = (response: any) => {
    alert(
      'Oh no 😢\nSomething went wrong with your login.\n\nTry again, or let us know at contact.joinme2020@gmail.com that there is an issue.'
    )
    console.log(response)
  }

  return (
    <GoogleLogin
      clientId={
        '830151949816-6fdv9tqs8h1e9me2rs2aa5l6h9f57lrd.apps.googleusercontent.com'
      }
      buttonText='Google Login'
      onSuccess={responseSuccessGoogle}
      onFailure={responseFailGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleUserLogin
