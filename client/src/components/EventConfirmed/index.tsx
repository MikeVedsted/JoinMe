import React, { useState } from 'react'
import axios from 'axios'

import Button from '../Button'
import EventTitle from '../EventTitle'
import EventImage from '../EventImage'
import EventDataBox from '../EventDataBox'
import EventCommentSection from '../EventCommentSection'
import { EventProps } from '../../types'
import './EventConfirmed.scss'

const EventConfirmed = ({ event }: EventProps) => {
  const { event_id, created_at, image, title, description, ep_id } = event
  const [hideComments, setHideComment] = useState(true)
  const [hideDetails, setHideDetails] = useState(true)

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

  const handleLeaveEvent = async () => {
    try {
      await axios.delete(`/api/v1/requests/${ep_id}/leave`)
      alert('Successfully deleted')
    } catch (error) {
      alert('Something went wrong. Please try again or refresh the page.')
      console.log(error)
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
            onClick={handleLeaveEvent}
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
        <EventDataBox event={event} />

        <p className='confirmed-event__description'>{description}</p>
      </div>

      <hr className='confirmed-event__line' />
    </div>
  )
}

export default EventConfirmed
