import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventType, EventId } from '../types'

const useGetSingleEvent = (eventId: EventId) => {
  const [data, setData] = useState<EventType>()

  useEffect(() => {
    async function getEventInfo() {
      try {
        const { data } = await axios.get(`/api/v1/events/${eventId}`)
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getEventInfo()
  }, [eventId])
  return [data]
}

export default useGetSingleEvent
