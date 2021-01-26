import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useHistory, useParams } from 'react-router-dom'

import { setErrors, clearErrors } from '../../redux/actions/error'
import { setLoading, setLoaded } from '../../redux/actions/loading'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'
import Button from '../../components/Button'
import EventList from '../../components/EventList'
import useHostedEvents from '../../hooks/useHostedEvents'
import { ProfilePageParams, AppState } from '../../Types'
import './ProfilePage.scss'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { error } = useSelector((state: AppState) => state)
  const { loading } = useSelector((state: AppState) => state.loading)
  console.log(loading)
  const [cookies] = useCookies(['user'])
  const currentUser = cookies.user.user_id
  const { userId } = useParams<ProfilePageParams>()
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
  const [hostedEvents] = useHostedEvents(userInfo.user_id)

  useEffect(() => {
    dispatch(setLoading())
    async function getUserInfo() {
      try {
        const url =
          userId === currentUser
            ? `/api/v1/users/${userId}`
            : `/api/v1/users/${userId}/public`
        const { data } = await axios.get(url)
        if (data.status === 'error') {
          throw { status: data.status, message: data.message }
        } else {
          dispatch(setLoaded())
          dispatch(clearErrors())
          setUserInfo(data)
        }
      } catch (error) {
        dispatch(setLoaded())
        dispatch(setErrors(error.status, error.message))
      }
    }
    getUserInfo()
  }, [])

  const handleEditClick = () => {
    history.push(`/user/${userId}/edit`)
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : userInfo.user_id ? (
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
                {`${userInfo.first_name} ${userInfo.last_name}`}
              </p>
            </div>
            {currentUser === userId && (
              <div className='profile__details'>
                <h4 className='profile__details--header'> Email: </h4>
                <p className='profile__details--text'> {userInfo.email} </p>
              </div>
            )}
            <div className='profile__details'>
              <h4 className='profile__details--header'> Interests: </h4>
              <p className='profile__details--text'>
                {userInfo.interests?.join(', ')}
              </p>
            </div>
            <div className='profile__details'>
              <h4 className='profile__details--header'> Intro: </h4>
              <p className='profile__details--text'>{userInfo.profile_text}</p>
            </div>
            {currentUser === userId && (
              <div className='profile__details'>
                <h4 className='profile__details--header'> Address: </h4>
                {userInfo.base_address ? (
                  <p className='profile__details--text'>
                    {userInfo.street} {userInfo.number}, {userInfo.postal_code}{' '}
                    {userInfo.city}, {userInfo.country}
                  </p>
                ) : (
                  <p className='profile__details--text'> - </p>
                )}
              </div>
            )}
            <EventList
              events={hostedEvents}
              title={`Events hosted by ${userInfo.first_name}`}
            />
          </div>
        </div>
      ) : (
        <NotFound message={error.message} />
      )}
    </>
  )
}

export default ProfilePage
