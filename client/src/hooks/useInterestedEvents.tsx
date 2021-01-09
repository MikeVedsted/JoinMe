import { useState, useEffect } from 'react'
import axios from 'axios'

const useParticipatingEvents = () => {
  const [interestedEvents, setInterestedEvents] = useState([])

  useEffect(() => {
    fetchInterestedEvents()
  }, [])

  const fetchInterestedEvents = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/interested`)
      setInterestedEvents(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [interestedEvents]
}

export default useParticipatingEvents
