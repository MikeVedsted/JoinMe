import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventDataBoxProps } from '../../types'
import './EventDataBox.scss'

const EventDataBox = ({
  created_by,
  creatorName,
  time,
  date,
  address,
  participants,
  max_participants
}: EventDataBoxProps) => {
  const formattedTime = time.slice(0, 5)
  const formattedDate = date.slice(0, 10).split('-').reverse().join('-')
  return (
    <div className='data-box'>
      <Link to={`/user/${created_by}`} className='data-box__link'>
        <FontAwesomeIcon icon='user' className='data-box__icon' />
        {creatorName}
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
        {`${participants}/${max_participants} confirmed`}
      </p>
    </div>
  )
}

export default EventDataBox
