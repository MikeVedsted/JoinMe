import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventParticipantProps } from '../../types'
import './EventParticipant.scss'

const EventParticipant = ({ user, handleDelete }: EventParticipantProps) => {
  return (
    <div className='participant'>
      <img
        className='participant__image'
        src={user.profile_image}
        alt='profile'
      />
      <Link className='participant__link' to={`/${user.user_id}`}>
        <p className='participant__name'>{`${user.first_name} ${user.last_name}`}</p>
      </Link>
      <FontAwesomeIcon
        onClick={handleDelete}
        className='participant__delete'
        icon={'trash'}
      />
    </div>
  )
}

export default EventParticipant
