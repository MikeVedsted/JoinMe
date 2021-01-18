import React, { useState } from 'react'

import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import EventCommentSection from '../EventCommentSection'
import { EventProps } from '../../types'
import './EventConfirmed.scss'

const EventConfirmed = ({ event }: EventProps) => {
  const [hideComments, setHideComment] = useState(true)
  const [hideDetails, setHideDetails] = useState(true)
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

  const handleToggle = (id: string) => {
    if (id === 'details') {
      setHideComment(true)
      setHideDetails(!hideDetails)
    }
    if (id === 'comments') {
      setHideDetails(true)
      setHideComment(!hideComments)
    }
  }

  return (
    <div className='confirmed-event'>
      <EventTitle title={title} createdAt={created_at} />
      <div className='confirmed-event__content'>
        <EventImage src={image} alt={title} />
        <div className='confirmed-event__buttons'>
          <Button
            type='button'
            text='Leave event'
            modifier='primary'
            onClick={() => console.log('cancel participation here')} // UPDATE AFTER MERGING #246
          />
          <Button
            type='button'
            text='View details'
            modifier='primary'
            id='details'
            onClick={(e) => handleToggle(e.target.id)}
          />
          <Button
            type='button'
            text={hideComments ? 'View comments' : 'Hide comments'}
            modifier='primary'
            id='comments'
            onClick={(e) => handleToggle(e.target.id)}
          />
        </div>
      </div>
      <div hidden={hideComments}>
        <EventCommentSection eventId={event_id} />
      </div>
      <div
        hidden={hideDetails}
        className={!hideDetails ? 'confirmed-event__details' : ''}
      >
        <EventDataBox
          created_by={created_by}
          creatorName={creatorName}
          date={date}
          time={time}
          address={`${street} ${number}, ${postal_code} ${city}`}
          participants={participants}
          max_participants={max_participants}
        />
        <p className='confirmed-event__description'>{description}</p>
      </div>
      <hr className='confirmed-event__line' />
    </div>
  )
}

export default EventConfirmed
