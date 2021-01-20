import React, { useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import AccountForm from '../../components/AccountForm'
import useUser from '../../hooks/useUser'
import { ProfilePageParamProps } from '../../types'
import './ProfileEdit.scss'

const ProfileEdit = () => {
  const { pathname } = useLocation()
  const { userId } = useParams<ProfilePageParamProps>()
  let history = useHistory()
  const [cookies] = useCookies(['user'])
  const { first_name, user_id } = cookies.user
  const [user, loading] = useUser(userId)
  const heading = pathname.includes('/account-setup')
    ? `Hi ${first_name}! Welcome to JoinMe!`
    : `Hi ${first_name}! Let's make some changes.`
  const paragraph = pathname.includes('/account-setup')
    ? `For a better experience finding events, Let's get your profile
          set up!`
    : ''

  useEffect(() => {
    userId !== user_id && history.push(`/user/${userId}`)
  }, [history, userId, user_id])

  return (
    !loading && (
      <div className='edit-page'>
        <h2 className='edit-page__title'>{heading}</h2>
        <p className='edit-page__text'>{paragraph}</p>
        {user && userId === user_id && <AccountForm userId={user_id} />}
      </div>
    )
  )
}

export default ProfileEdit
