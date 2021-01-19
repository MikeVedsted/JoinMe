import React from 'react'

import Event from '../../components/Event'
import EventHosted from '../../components/EventHosted'
import EventInterested from '../../components/EventInterested'
import EventConfirmed from '../../components/EventConfirmed'
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
      {events.map((event: EventType) => content(event))}
    </div>
  )
}

export default EventList
