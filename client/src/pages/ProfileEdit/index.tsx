import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import AccountForm from '../../components/AccountForm'
import useUser from '../../hooks/useUser'
import { ProfilePageParamProps } from '../../types'
import './ProfileEdit.scss'

const ProfileEdit = () => {
  const { userId } = useParams<ProfilePageParamProps>()
  let history = useHistory()
  const [cookies] = useCookies(['user'])
  const { first_name, user_id } = cookies.user
  const [user, loading] = useUser(userId)

  useEffect(() => {
    userId !== user_id && history.push(`/user/${userId}`)
  }, [history, userId, user_id])

  return (
    !loading && (
      <div className='editPage'>
        <h2 className='editPage__title'>
          Hi {first_name}! Let&apos;s make some changes.
        </h2>
        {user && userId === user_id && <AccountForm userId={user_id} />}
      </div>
    )
  )
}

export default ProfileEdit
