import React from 'react'

import { EventListProps } from '../../types'
import Event from '../../components/Event'
import './EventList.scss'

const EventList = ({ events, title }: EventListProps) => {
  return (
    <div className='event-list'>
      {title && <h2 className='event-list__title'>{title}</h2>}
      {events.map((event: any) => (
        <Event
          key={event.event_id}
          created_by={event.created_by}
          created_at={event.created_at}
          image={event.image}
          title={event.title}
          date={event.date}
          time={event.time}
          address={event.address}
          participants={event.participants}
          max_participants={event.max_participants}
          description={event.description}
          handleAddRequest={event.handleAddRequest}
          event_id={event.event_id}
        />
      ))}
    </div>
  )
}

export default EventList
