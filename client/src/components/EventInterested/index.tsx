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
  const { event_id, created_at, image, title, description, er_id } = event
  const [hideComments, setHideComment] = useState(true)

  const handleCancelRequest = async () => {
    try {
      await axios.delete(`/api/v1/requests/${er_id}/cancel`)
      alert('Successfully deleted')
    } catch (error) {
      alert('Something went wrong. Please try again or refresh the page.')
      console.log(error)
    }
  }

  return (
    <div className='interested-event'>
      <EventTitle title={title} createdAt={created_at} />

      <div>
        <EventImage src={image} alt={title} />
        <EventDataBox event={event} />
      </div>

      <p className='interested-event__description'>{description}</p>

      <div className='interested-event__buttons'>
        <Button
          type='button'
          text='Cancel request'
          modifier='primary'
          onClick={handleCancelRequest}
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
