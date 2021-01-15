import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventType } from '../types'

const useEventDisplay = () => {
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    fetchEvents()
  }, [events])

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('/api/v1/events')
      setEvents(data)
    } catch (error) {
      throw error
    }
  }
  return [events]
}

export default useEventDisplay
