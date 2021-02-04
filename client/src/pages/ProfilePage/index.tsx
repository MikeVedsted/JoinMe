import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Button from '../../components/Button'
import EventList from '../../components/EventList'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'
import useHostedEvents from '../../hooks/useHostedEvents'
import { ProfilePageParams, UserState, AppState } from '../../Types'
import { setErrors, clearErrors } from '../../redux/actions/error'
import { setLoading, setLoaded } from '../../redux/actions/loading'
import './ProfilePage.scss'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams<ProfilePageParams>()
  const user = useSelector((state: AppState) => state.user)
  const { loading } = useSelector((state: AppState) => state.loading)
  const { error } = useSelector((state: AppState) => state)
  const [userInfo, setUserInfo] = useState<Partial<UserState>>({
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
    postal_code: NaN,
    city: '',
    country: ''
  })
  const [hostedEvents] = useHostedEvents(userId)

  const handleEditClick = () => {
    history.push(`/user/${userId}/edit`)
  }

  async function getUserInfo() {
    try {
      dispatch(setLoading())
      const { data } = await axios.get(`/api/v1/users/${userId}/public`)
      if (data.status === 'error') {
        throw { status: data.status, message: data.message }
      } else {
        setUserInfo(data)
        dispatch(setLoaded())
      }
    } catch (error) {
      dispatch(setErrors(error.status, error.message))
      dispatch(setLoaded())
    }
  }

  useEffect(() => {
    dispatch(clearErrors())
    if (userId === user.user_id) {
      setPublicMode(false)
      setUserInfo(user)
    } else {
      setPublicMode(true)
      getUserInfo()
    }
  }, [userId, user.user_id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : error.message === 'No found user' ? (
        <NotFound message={error.message} />
      ) : (
        <div className='profile'>
          <div className='profile__sidebar'>
            <img
              src={userInfo.profile_image}
              alt='Profile'
              className='profile__sidebar--image'
            />
            {userId === user.user_id && (
              <Button
                type='button'
                text='Edit profile'
                modifier='primary'
                onClick={handleEditClick}
              />
            )}
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
              <p className='profile__details--text'>{userInfo.profile_text}</p>
            </div>

            {userId === user.user_id && (
              <>
                <div className='profile__details'>
                  <h4 className='profile__details--header'> Email: </h4>
                  <p className='profile__details--text'> {user.email} </p>
                </div>

                <div className='profile__details'>
                  <h4 className='profile__details--header'> Interests: </h4>
                  <p className='profile__details--text'>
                    {user.interests?.join(', ')}
                  </p>
                </div>

                <div className='profile__details'>
                  <h4 className='profile__details--header'> Address: </h4>
                  <p className='profile__details--text'>
                    {user.base_address
                      ? `${user.street} ${user.number}, ${user.postal_code} ${user.city}, ${user.country}`
                      : '-'}
                  </p>
                </div>
              </>
            )}

            <EventList
              events={hostedEvents}
              title={`Events hosted by ${userInfo.first_name}`}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProfilePage
