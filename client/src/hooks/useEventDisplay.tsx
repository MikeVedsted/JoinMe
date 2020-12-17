import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventType } from '../types'

const useEventDisplay = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/v1/events'
      })
      const data = response.data
      setEvents(data)
    } catch (error) {
      setError(error.message)
    }
  }
  return events
}

export default useEventDisplay
