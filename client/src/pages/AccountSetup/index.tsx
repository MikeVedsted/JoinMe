import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import { User } from '../../types'
import AccountForm from '../../components/AccountForm'
import './AccountSetup.scss'

const AccountSetup = () => {
  const [cookies, setCookies] = useCookies(['user'])
  const [user, setUser] = useState<User>({
    email: 'mike@asdf.dk',
    first_name: 'mike',
    last_name: 'vedsted',
    profile_image:
      'https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s800-c85.jpg',
    base_address: 'asd',
    date_of_birth: '1988-11-19T22:00:00.000Z',
    gender: 'Male',
    profile_text: 'asdasdasdasd',
    user_id: '08cd907f-2419-4d40-91cd-57d0d559e991'
  })
  const { first_name, user_id } = cookies.user
  const getUser = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/api/v1/users/${user_id}`
      })
      const user: User = response.data
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='page'>
      <h2 className='page__title'>{`Hi ${first_name}! Welcome to JoinMe`}</h2>
      <p className='page__text'>
        {`For a better experience finding events, let's get your profile set up!`}
      </p>
      <AccountForm user={user} />
    </div>
  )
}

export default AccountSetup
