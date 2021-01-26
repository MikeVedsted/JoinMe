import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventParticipantProps } from '../../Types'
import { deleteParticipant } from '../../redux/actions/eventParticipants'
import './EventParticipant.scss'

const EventParticipant = ({ participant }: EventParticipantProps) => {
  const dispatch = useDispatch()
  const { profile_image, user_id, first_name, last_name, ep_id } = participant

  return (
    <div className='participant'>
      <div className='participant__user-info'>
        <img
          className='participant__image'
          src={profile_image}
          alt={first_name}
        />
        <Link className='participant__link' to={`/user/${user_id}`}>
          <p className='participant__name'>{`${first_name} ${last_name}`}</p>
        </Link>
      </div>
      <FontAwesomeIcon
        onClick={() => dispatch(deleteParticipant(ep_id))}
        className='participant__delete'
        icon={'trash'}
      />
    </div>
  )
}

export default EventParticipant
