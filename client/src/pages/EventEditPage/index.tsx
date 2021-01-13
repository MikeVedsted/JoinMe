import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import EventUpdateForm from '../../components/EventUpdateForm'
import { EventEditPageParamProps, EventType } from '../../types'
import './EventEditPage.scss'

const EventEditPage = () => {
  const { eventId } = useParams<EventEditPageParamProps>()
  const [cookies] = useCookies(['user'])
  const { user_id } = cookies.user
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<EventType>()

  useEffect(() => {
    async function getEventInfo() {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/v1/events/${eventId}`)
        setData(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getEventInfo()
  }, [eventId])

  // FIX? Add loading component/icon anything if needed
  if (loading)
    return <div className='loading'>Hold on! we are loading the data...</div>
  return (
    !loading && (
      <div className='event-edit-page'>
        {user_id === data?.created_by && (
          <EventUpdateForm data={data} user={user_id} eventId={eventId} />
        )}
      </div>
    )
  )
}

export default EventEditPage
