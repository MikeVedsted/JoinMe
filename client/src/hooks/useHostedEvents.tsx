import { useState, useEffect } from 'react'
import axios from 'axios'

import { UserId } from '../types'

const useHostedEvents = (userId: UserId) => {
  const [hostedEvents, setHostedEvents] = useState([])

  useEffect(() => {
    fetchHostedEvents()
  }, [])

  const fetchHostedEvents = async () => {
    try {
      const { data } = await axios.get(`/api/v1/events/creator/${userId}`)
      setHostedEvents(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [hostedEvents]
}

export default useHostedEvents
