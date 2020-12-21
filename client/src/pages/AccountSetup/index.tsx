import React from 'react'
import { useCookies } from 'react-cookie'

import AccountForm from '../../components/AccountForm'
import './AccountSetup.scss'

const AccountSetup = () => {
  const [cookies] = useCookies(['user'])
  const { first_name, user_id } = cookies.user

  return (
    <div className='page'>
      <h2 className='page__title'>{`Hi ${first_name}! Welcome to JoinMe`}</h2>
      <p className='page__text'>
        {`For a better experience finding events, let's get your profile set up!`}
      </p>
      <AccountForm userId={user_id} />
    </div>
  )
}

export default AccountSetup
