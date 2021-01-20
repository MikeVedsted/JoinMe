import React from 'react'

import Event from '../Event'
import NotFound from '../NotFound'
import EventHosted from '../EventHosted'
import EventConfirmed from '../EventConfirmed'
import EventInterested from '../EventInterested'

import { EventListProps, EventType } from '../../types'
import './EventList.scss'

const EventList = ({ events, title, type }: EventListProps) => {
  const content = (event: EventType) => {
    if (type === 'hosted')
      return <EventHosted key={event.event_id} event={event} />
    if (type === 'interested')
      return <EventInterested key={event.event_id} event={event} />
    if (type === 'confirmed')
      return <EventConfirmed key={event.event_id} event={event} />
    return <Event key={event.event_id} event={event} />
  }

  return (
    <div className='event-list'>
      {title && <h2 className='event-list__title'>{title}</h2>}
      {events.length > 0 ? (
        events.map((event: EventType) => content(event))
      ) : (
        <NotFound message='No events here yet.' />
      )}
    </div>
  )
}

export default EventList
