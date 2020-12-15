import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'
import { useHistory } from 'react-router-dom'

import Button from '../../components/Button'
import Navbar from '../../components/Navbar'
import { ProfilePageParam } from '../../types'
import './ProfilePage.scss'

const ProfilePage = ({ match }: RouteComponentProps<ProfilePageParam>) => {
  const history = useHistory()
  const userId = match.params.userId
  const [profileImage, setProfileImage] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [interest] = useState('Sport')
  const [profileText, setProfileText] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get(`/api/v1/users/${userId}`)
        setProfileImage(data.profile_image)
        setFullName(`${data.first_name} ${data.last_name}`)
        setEmail(data.email)
        setProfileText(data.profile_text)
        setAddress(data.base_address)
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
        <div className='profile__left'>
          <img src={profileImage} alt='Profile' />
          <Button
            type='button'
            text='Edit profile'
            style='secondary'
            handleClick={handleEditClick}
          />
        </div>
        <div className='profile__right'>
          <div className='profile__header'>
            <h3> Personal Details </h3>
            <hr />
          </div>
          <div className='profile__details'>
            <h4> Full Name: </h4>
            <p> {fullName} </p>
          </div>

          <div className='profile__details'>
            <h4> Email: </h4>
            <p> {email} </p>
          </div>

          <div className='profile__details'>
            <h4> Interests: </h4>
            <p> {interest} </p>
          </div>

          <div className='profile__details'>
            <h4> Intro: </h4>
            <p> {profileText} </p>
          </div>

          <div className='profile__details'>
            <h4> Address: </h4>
            <p> {address} </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
