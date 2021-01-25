import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { useSelector, useDispatch } from 'react-redux'

import { authenticateUser } from '../../redux/actions'
import { AppState } from '../../Types'

const GoogleUserLogin = () => {
  const GOOGLE_CLIENT = process.env.REACT_APP_GOOGLE_API_KEY as string
  const { created_at, user_id } = useSelector((state: AppState) => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const responseSuccessGoogle = async (response: any) => {
    const { id_token } = response.tokenObj
    dispatch(authenticateUser(id_token))
  }

  const responseFailGoogle = (response: any) => {
    alert(
      'Oh no 😢\nSomething went wrong with your login.\n\nTry again, or let us know at contact.joinme2020@gmail.com that there is an issue.'
    )
    console.log(response)
  }

  useEffect(() => {
    const diff = new Date().getTime() - new Date(created_at).getTime()
    if (diff < 6000) history.push(`/user/${user_id}/account-setup`)
  }, [created_at])

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
