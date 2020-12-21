import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { GoogleLogin } from 'react-google-login'

const GoogleUserLogin = () => {
  const GOOGLE_CLIENT = process.env.REACT_APP_GOOGLE_API_KEY as string
  const [cookies, setCookies] = useCookies(['user'])
  const history = useHistory()

  const checkIfNew = (date: string, userId: string) => {
    const diff = new Date().getTime() - new Date(date).getTime()
    if (diff < 60000) history.push(`/${userId}/account-setup`)
  }

  const responseSuccessGoogle = async (response: any) => {
    const userToken = await response.tokenObj.id_token
    try {
      const res = await axios.post('/api/v1/users/google-authenticate', {
        id_token: userToken
      })
      const {
        user_id,
        first_name,
        last_name,
        profile_image,
        created_at
      } = res.data
      setCookies('user', { user_id, first_name, last_name, profile_image })
      checkIfNew(created_at, user_id)
    } catch (error) {
      console.log(error)
    }
  }

  const responseFailGoogle = (response: any) => {
    alert(
      'Sorry, something went wrong.\nPlease try again.\n\nIf the issue persists, let us know at contact.joinme2020@gmail.com'
    )
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
