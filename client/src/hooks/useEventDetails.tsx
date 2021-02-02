import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventObject, EventId } from '../Types'

const useEventDetails = (eventId: EventId) => {
  const [details, setDetails] = useState<EventObject>()

  useEffect(() => {
    async function getEventInfo() {
      try {
        const { data } = await axios.get(`/api/v1/events/${eventId}`)
        setDetails(data)
      } catch (error) {
        console.log(error)
      }
    }
    getEventInfo()
  }, [eventId])
  return [details]
}

export default useEventDetails
