import React, { useState } from 'react'
import axios from 'axios'

import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import EventCommentSection from '../EventCommentSection'
import { EventProps } from '../../types'
import './EventInterested.scss'

const EventInterested = ({ event }: EventProps) => {
  const [hideComments, setHideComment] = useState(true)
  const {
    event_id,
    created_by,
    created_at,
    image,
    title,
    date,
    time,
    max_participants,
    description,
    street,
    number,
    postal_code,
    city,
    first_name,
    last_name
  } = event
  const creatorName = `${first_name} ${last_name}`
  const participants = 2 // UPDATE AFTER MERGING #246

  return (
    <div className='interested-event'>
      <EventTitle title={title} createdAt={created_at} />
      <div>
        <EventImage src={image} alt={title} />
        <EventDataBox
          created_by={created_by}
          creatorName={creatorName}
          date={date}
          time={time}
          address={`${street} ${number}, ${postal_code} ${city}`}
          participants={participants}
          max_participants={max_participants}
        />
      </div>
      <p className='interested-event__description'>{description}</p>
      <div className='interested-event__buttons'>
        <Button
          type='button'
          text={'Cancel request'}
          modifier='primary'
          onClick={() => setHideComment(!hideComments)} // UPDATE AFTER MERGING #246
        />
        <Button
          type='button'
          text={hideComments ? 'View comments' : 'Hide comments'}
          modifier='primary'
          onClick={() => setHideComment(!hideComments)}
        />
      </div>
      <div hidden={hideComments}>
        <EventCommentSection eventId={event_id} />
      </div>
      <hr className='interested-event__line' />
    </div>
  )
}

export default EventInterested
