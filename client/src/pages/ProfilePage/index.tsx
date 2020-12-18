import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Navbar from '../../components/Navbar'
import { ProfilePageParam } from '../../types'
import './ProfilePage.scss'

const ProfilePage = () => {
  const history = useHistory()
  const { userId } = useParams<ProfilePageParam>()
  const [userInfo, setUserInfo] = useState({
    profile_image: '',
    first_name: '',
    last_name: '',
    email: '',
    interests: [],
    profile_text: '',
    base_address: ''
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
    history.push('/')
  }

  return (
    <>
      <Navbar />
      <div className='profile'>
        <div className='profile__sidebar'>
          <img src={userInfo.profile_image} alt='Profile' />
          <Button
            type='button'
            text='Edit profile'
            handleClick={handleEditClick}
          />
        </div>
        <div className='profile__main'>
          <div className='profile__header'>
            <h3> Personal Details </h3>
            <hr />
          </div>
          <div className='profile__details'>
            <h4> Full Name: </h4>
            <p> {`${userInfo.first_name} ${userInfo.last_name}`} </p>
          </div>

          <div className='profile__details'>
            <h4> Email: </h4>
            <p> {userInfo.email} </p>
          </div>

          <div className='profile__details'>
            <h4> Interests: </h4>
            <p> {userInfo.interests?.join(', ')} </p>
          </div>

          <div className='profile__details'>
            <h4> Intro: </h4>
            <p> {userInfo.profile_text} </p>
          </div>

          <div className='profile__details'>
            <h4> Address: </h4>
            <p> {userInfo.base_address} </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
