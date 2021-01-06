import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useHistory, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import { ProfilePageParamProps } from '../../types'
import './ProfilePage.scss'

const ProfilePage = () => {
  const history = useHistory()
  const [cookies] = useCookies(['user'])
  const { userId } = useParams<ProfilePageParamProps>()
  const [userInfo, setUserInfo] = useState({
    profile_image: '',
    first_name: '',
    last_name: '',
    email: '',
    interests: [],
    profile_text: '',
    full_address: '',
    base_address: '',
    street: '',
    number: '',
    postal_code: '',
    city: '',
    country: ''
  })

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(`/api/v1/users/${userId}`)
        setUserInfo(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserInfo()
  }, [userId])

  const handleEditClick = () => {
    history.push(`/users/${userId}/account-setup`)
  }

  return (
    <div className='profile'>
      <div className='profile__sidebar'>
        <img
          src={userInfo.profile_image}
          alt='Profile'
          className='profile__sidebar--image'
        />
        <Button
          type='button'
          text='Edit profile'
          modifier='primary'
          onClick={handleEditClick}
        />
      </div>
      <div className='profile__main'>
        <div className='profile__header'>
          <hr className='profile__header--divider-optional' />
          <h3 className='profile__header--text'> Personal Details </h3>
          <hr className='profile__header--divider' />
        </div>
        <div className='profile__details'>
          <h4 className='profile__details--header'> Full Name: </h4>
          <p className='profile__details--text'>
            {' '}
            {`${userInfo.first_name} ${userInfo.last_name}`}{' '}
          </p>
        </div>

        {cookies.user.user_id === userId && (
          <div className='profile__details'>
            <h4 className='profile__details--header'> Email: </h4>
            <p className='profile__details--text'> {userInfo.email} </p>
          </div>
        )}

        <div className='profile__details'>
          <h4 className='profile__details--header'> Interests: </h4>
          <p className='profile__details--text'>
            {' '}
            {userInfo.interests?.join(', ')}{' '}
          </p>
        </div>

        <div className='profile__details'>
          <h4 className='profile__details--header'> Intro: </h4>
          <p className='profile__details--text'> {userInfo.profile_text} </p>
        </div>

        {cookies.user.user_id === userId && (
          <div className='profile__details'>
            <h4 className='profile__details--header'> Address: </h4>
            {userInfo.base_address ? (
              <p className='profile__details--text'>
                `${userInfo.street} ${userInfo.number}, ${userInfo.postal_code}{' '}
                ${userInfo.city}, ${userInfo.country}`
              </p>
            ) : (
              <p className='profile__details--text'> - </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
