import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import EventForm from '../../components/EventForm'
import Loading from '../../components/Loading'
import useEventDetails from '../../hooks/useEventDetails'
import { AppState, EventEditPageParams } from '../../Types'
import './EventEditPage.scss'

const EventEditPage = () => {
  const { user_id } = useSelector((state: AppState) => state.user)
  const { loading } = useSelector((state: AppState) => state.loading)
  const { eventId } = useParams<EventEditPageParams>()
  const [event] = useEventDetails(eventId)

  return (
    <div className='event-edit-page'>
      {loading && <Loading />}
      {!loading && event && user_id === event.created_by && (
        <EventForm event={event} />
      )}
    </div>
  )
}

export default EventEditPage
