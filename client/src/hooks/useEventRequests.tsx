import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventId } from '../types'

const useEventRequests = (eventId: EventId) => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`/api/v1/events/${eventId}/requests`)
      setRequests(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [requests]
}

export default useEventRequests
