import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  formatTime,
  formatDate,
  formatAddress
} from '../../util/helperFunctions'
import { EventDataBoxProps } from '../../types'
import './EventDataBox.scss'

const EventDataBox = ({ event, participantCount }: EventDataBoxProps) => {
  const {
    time,
    date,
    created_by,
    first_name,
    last_name,
    street,
    number,
    postal_code,
    city,
    max_participants
  } = event
  const address = { street, number, postal_code, city }

  return (
    <div className='data-box'>
      <Link to={`/user/${created_by}`} className='data-box__link'>
        <FontAwesomeIcon icon='user' className='data-box__icon' />
        {`${first_name} ${last_name}`}
      </Link>
      <p className='data-box__line'>
        <FontAwesomeIcon icon='calendar' className='data-box__icon' />
        {formatDate(date)}
      </p>
      <p className='data-box__line'>
        <FontAwesomeIcon icon='clock' className='data-box__icon' />
        {formatTime(time)}
      </p>
      <p className='data-box__line'>
        <FontAwesomeIcon icon='map-marker-alt' className='data-box__icon' />
        {formatAddress(address)}
      </p>
      <p className='data-box__line'>
        <FontAwesomeIcon icon='user' className='data-box__icon' />
        {participantCount}/{max_participants} confirmed
      </p>
    </div>
  )
}

export default EventDataBox
