import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { setErrors, clearErrors } from '../../redux/actions/error'
import EventList from '../../components/EventList'
import useHostedEvents from '../../hooks/useHostedEvents'
import NotFound from '../../components/NotFound'
import { ProfilePageParams, AppState } from '../../Types'
import './ProfilePage.scss'

export default function PublicProfilePage() {
  const dispatch = useDispatch()
  const { error } = useSelector((state: AppState) => state)
  const { userId } = useParams<ProfilePageParams>()
  const [hostedEvents] = useHostedEvents(userId)
  const [userInfo, setUserInfo] = useState({
    user_id: '',
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
    dispatch(clearErrors())
    async function getUserInfo() {
      try {
        const { data } = await axios.get(`/api/v1/users/${userId}/public`)
        if (data.status === 'error') {
          throw { status: data.status, message: data.message }
        } else {
          setUserInfo(data)
        }
      } catch (error) {
        dispatch(setErrors(error.status, error.message))
      }
    }
    getUserInfo()
  }, [dispatch, userId])

  return (
    <>
      {error.message === 'No found user' ? (
        <NotFound message={error.message} />
      ) : (
        userInfo.user_id && (
          <div className='profile'>
            <div className='profile__sidebar'>
              <img
                src={userInfo.profile_image}
                alt='Profile'
                className='profile__sidebar--image'
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
                  {`${userInfo.first_name} ${userInfo.last_name}`}
                </p>
              </div>
              <div className='profile__details'>
                <h4 className='profile__details--header'> Intro: </h4>
                <p className='profile__details--text'>
                  {userInfo.profile_text}
                </p>
              </div>
              <EventList
                events={hostedEvents}
                title={`Events hosted by ${userInfo.first_name}`}
              />
            </div>
          </div>
        )
      )}
    </>
  )
}
