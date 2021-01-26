import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { deleteParticipant } from '../../redux/actions/eventParticipants'
import ProfileImage from '../ProfileImage'
import { EventParticipantProps } from '../../Types'
import './EventParticipant.scss'

const EventParticipant = ({ participant }: EventParticipantProps) => {
  const dispatch = useDispatch()
  const { profile_image, user_id, first_name, last_name, ep_id } = participant

  return (
    <div className='participant'>
      <div className='participant__user-info'>
        <ProfileImage image={profile_image} alt='participant' />
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
