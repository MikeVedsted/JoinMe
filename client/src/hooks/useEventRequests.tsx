import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventId } from '../Types'

const useEventRequests = (eventId: EventId) => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetchRequests()
    // eslint-disable-next-line
  }, [])

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(`/api/v1/requests/${eventId}`)
      setRequests(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [requests]
}

export default useEventRequests
