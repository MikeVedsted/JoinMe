import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventParticipantProps } from '../../Types'
import { deleteParticipant } from '../../redux/actions/participants'
import './EventParticipant.scss'

const EventParticipant = ({ participant }: EventParticipantProps) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const { profile_image, user_id, first_name, last_name, ep_id } = participant

  const handleDelete = async (participantId: string) => {
    try {
      dispatch(deleteParticipant(participantId))
      setMessage(`${first_name} ${last_name} removed from your event.`)
    } catch (error) {
      setMessage('Something went wrong, please try again!')
    }
  }

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
        onClick={() => handleDelete(ep_id)}
        className='participant__delete'
        icon={'trash'}
      />
    </div>
  )
}

export default EventParticipant
