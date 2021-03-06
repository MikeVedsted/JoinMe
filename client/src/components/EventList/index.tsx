import React from 'react'
import { useSelector } from 'react-redux'

import Event from '../Event'
import Loading from '../Loading'
import NotFound from '../NotFound'
import EventHosted from '../EventHosted'
import EventConfirmed from '../EventConfirmed'
import EventInterested from '../EventInterested'
import { EventListProps, EventObject, AppState } from '../../Types'
import './EventList.scss'

const EventList = ({ events, title, type }: EventListProps) => {
  const { loading } = useSelector((state: AppState) => state.loading)

  const content = (event: EventObject) => {
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
      {loading ? (
        <Loading />
      ) : events.length > 0 ? (
        events.map((event: EventObject) => content(event))
      ) : (
        <NotFound message='No events found.' />
      )}
    </div>
  )
}

export default EventList
