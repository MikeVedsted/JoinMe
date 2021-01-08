import React from 'react'

import Event from '../../components/Event'
import { EventListProps } from '../../types'
import './EventList.scss'

const EventList = ({ events, title }: EventListProps) => {
  return (
    <div className='event-list'>
      {title && <h2 className='event-list__title'>{title}</h2>}
      {events.map((event: any) => (
        <Event
          key={event.created_at}
          event_id={event.event_id}
          title={event.title}
          date={event.date}
          time={event.time}
          description={event.description}
          max_participants={event.max_participants}
          created_by={event.created_by}
          created_at={event.created_at}
          image={event.image}
          street={event.street}
          number={event.number}
          postal_code={event.postal_code}
          city={event.city}
          creatorName={`${event.first_name} ${event.last_name}`}
          participants={event.participants}
          handleAddRequest={event.handleAddRequest}
        />
      ))}
    </div>
  )
}

export default EventList
