import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventParticipantProps } from '../../types'
import './EventParticipant.scss'

const EventParticipant = ({ user, handleDelete }: EventParticipantProps) => {
  const { profile_image, user_id, first_name, last_name } = user

  return (
    <div className='participant'>
      <img
        className='participant__image'
        src={profile_image}
        alt={first_name}
      />
      <Link className='participant__link' to={`/${user_id}`}>
        <p className='participant__name'>{`${first_name} ${last_name}`}</p>
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
