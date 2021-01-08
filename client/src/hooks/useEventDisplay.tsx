import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventType } from '../types'

const useEventDisplay = () => {
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/v1/events')
      const data = response.data
      setEvents(data)
    } catch (error) {
      throw error
    }
  }
  return [events]
}

export default useEventDisplay
