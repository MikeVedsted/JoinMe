import React from 'react'

import Event from '../../components/Event'
import EventHosted from '../../components/EventHosted'
import EventInterested from '../../components/EventInterested'
import { EventListProps, EventType } from '../../types'
import './EventList.scss'

const EventList = ({ events, title, type }: EventListProps) => {
  const content = (event: EventType) => {
    if (type === 'hosted')
      return <EventHosted key={event.created_at} event={event} />
    if (type === 'interested')
      return <EventInterested key={event.created_at} event={event} />
    return (
      <Event
        key={event.created_at}
        event={event}
        creatorName={`${event.first_name} ${event.last_name}`}
        participants={event.participants}
      />
    )
  }

  return (
    <div className='event-list'>
      {title && <h2 className='event-list__title'>{title}</h2>}
      {events.map((event: EventType) => content(event))}
    </div>
  )
}

export default EventList
