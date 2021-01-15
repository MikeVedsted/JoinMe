import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventParticipantProps } from '../../types'
import './EventParticipant.scss'

const EventParticipant = ({ participant }: EventParticipantProps) => {
  const { profile_image, user_id, first_name, last_name, ep_id } = participant

  const handleDelete = async (participantId: string) => {
    try {
      await axios.delete(`/api/v1/requests/${participantId}/remove-participant`)
      alert('Deleted')
    } catch (error) {
      console.log(error)
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
