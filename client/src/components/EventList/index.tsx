import React from 'react'

import Event from '../../components/Event'
import { EventListProps } from '../../types'
import './EventList.scss'

const EventList = ({ events, title }: EventListProps) => {
  return (
    <div className='event-list'>
      {title && <h2 className='event-list__title'>{title}</h2>}
      {events.map((event: any) => (
        <Event key={event.created_at} event={event} />
      ))}
    </div>
  )
}

export default EventList
