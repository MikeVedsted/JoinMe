import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import EventList from '../../components/EventList'
import useHostedEvents from '../../hooks/useHostedEvents'
import { ProfilePageParams, AppState } from '../../Types'
import './ProfilePage.scss'

export default function PrivateProfilePage() {
  const history = useHistory()
  const { userId } = useParams<ProfilePageParams>()
  const user = useSelector((state: AppState) => state.user)
  const [hostedEvents] = useHostedEvents(userId)

  const handleEditClick = () => {
    history.push(`/user/${userId}/edit`)
  }

  return (
    <div className='profile'>
      <div className='profile__sidebar'>
        <img
          src={user.profile_image}
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
            {`${user.first_name} ${user.last_name}`}
          </p>
        </div>
        <div className='profile__details'>
          <h4 className='profile__details--header'> Intro: </h4>
          <p className='profile__details--text'>{user.profile_text}</p>
        </div>

        <div className='profile__details'>
          <h4 className='profile__details--header'> Email: </h4>
          <p className='profile__details--text'> {user.email} </p>
        </div>

        <div className='profile__details'>
          <h4 className='profile__details--header'> Interests: </h4>
          <p className='profile__details--text'>{user.interests?.join(', ')}</p>
        </div>

        <div className='profile__details'>
          <h4 className='profile__details--header'> Address: </h4>
          {user.base_address ? (
            <p className='profile__details--text'>
              {user.street} {user.number}, {user.postal_code} {user.city},{' '}
              {user.country}
            </p>
          ) : (
            <p className='profile__details--text'> - </p>
          )}
        </div>

        <EventList
          events={hostedEvents}
          title={`Events hosted by ${user.first_name}`}
        />
      </div>
    </div>
  )
}
