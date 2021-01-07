import React from 'react'
import { useCookies } from 'react-cookie'

import AccountForm from '../../components/AccountForm'
import './ProfileEdit.scss'

const AccountSetup = () => {
  const [cookies] = useCookies(['user'])
  const { first_name, user_id } = cookies.user

  return (
    <div className='page'>
      <h2 className='page__title'>
        Hi {first_name}! Let&apos;s make some changes.
      </h2>
      <AccountForm userId={user_id} />
    </div>
  )
}

export default AccountSetup
