import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventId } from '../types'

const useEventParticipants = (eventId: EventId) => {
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    fetchParticipants()
  }, [])

  const fetchParticipants = async () => {
    try {
      const { data } = await axios.get(`/api/v1/events/${eventId}/participants`)
      setParticipants(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [participants]
}

export default useEventParticipants
