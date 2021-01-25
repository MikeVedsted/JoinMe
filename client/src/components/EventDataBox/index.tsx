import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useEventParticipants from '../../hooks/useEventParticipants'
import { EventDataBoxProps } from '../../Types'
import './EventDataBox.scss'

const EventDataBox = ({ event }: EventDataBoxProps) => {
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
    event_id,
    max_participants
  } = event
  const [participants] = useEventParticipants(event_id)
  const formattedTime = time.slice(0, 5)
  const formattedDate = date.slice(0, 10).split('-').reverse().join('-')
  const address = `${street} ${number}, ${postal_code} ${city}`
  const confirmedParticipants =
    participants.length > 0 ? participants.length : 0

  return (
    <div className='data-box'>
      <Link to={`/user/${created_by}`} className='data-box__link'>
        <FontAwesomeIcon icon='user' className='data-box__icon' />
        {`${first_name} ${last_name}`}
      </Link>
      <p>
        <FontAwesomeIcon icon='calendar' className='data-box__icon' />
        {formattedDate}
      </p>
      <p>
        <FontAwesomeIcon icon='clock' className='data-box__icon' />
        {formattedTime}
      </p>
      <p>
        <FontAwesomeIcon icon='map-marker-alt' className='data-box__icon' />
        {address}
      </p>
      <p>
        <FontAwesomeIcon icon='user' className='data-box__icon' />
        {`${confirmedParticipants}/${max_participants} confirmed`}
      </p>
    </div>
  )
}

export default EventDataBox
