import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom'

import Loading from '../../components/Loading'
import AccountForm from '../../components/AccountForm'
import { AppState, ProfilePageParams } from '../../Types'
import './ProfileEdit.scss'

const ProfileEdit = () => {
  let history = useHistory()
  const { pathname } = useLocation()
  const { userId } = useParams<ProfilePageParams>()
  const { loading } = useSelector((state: AppState) => state.loading)
  const { first_name, user_id } = useSelector((state: AppState) => state.user)

  const isSetup = () => {
    return pathname.includes('/account-setup')
  }

  useEffect(() => {
    userId !== user_id && history.push(`/user/${userId}`)
  }, [history, userId, user_id])

  return !loading ? (
    <div className='edit-page'>
      <h2 className='edit-page__title'>
        {isSetup()
          ? `Hi ${first_name}! Welcome to JoinMe!`
          : `Hi ${first_name}! Let's make some changes.`}
      </h2>
      <p className='edit-page__text'>
        {isSetup() &&
          `For a better experience finding events, Let's get your profile
          set up!`}
      </p>
      {userId === user_id && <AccountForm userId={user_id} />}
    </div>
  ) : (
    <Loading />
  )
}

export default ProfileEdit
