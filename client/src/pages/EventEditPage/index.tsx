import React from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import EventUpdateForm from '../../components/EventUpdateForm'
import useEventDetails from '../../hooks/useEventDetails'
import { EventEditPageParams } from '../../Types'
import './EventEditPage.scss'

const EventEditPage = () => {
  const { eventId } = useParams<EventEditPageParams>()
  const [data] = useEventDetails(eventId)
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user

  if (!data)
    return <div className='loading'>Hold on! we are loading the data...</div>
  return (
    data && (
      <div className='event-edit-page'>
        {user_id === data?.created_by && (
          <EventUpdateForm data={data} eventId={eventId} />
        )}
      </div>
    )
  )
}

export default EventEditPage
