import { useState, useEffect } from 'react'
import axios from 'axios'

const useParticipatingEvents = () => {
  const [participatingEvents, setParticipatingEvents] = useState([])

  useEffect(() => {
    fetchParticipatingEvents()
  }, [])

  const fetchParticipatingEvents = async () => {
    try {
      const response = await axios.get(`/api/v1/users/participant`)
      const data = response.data
      setParticipatingEvents(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [participatingEvents]
}

export default useParticipatingEvents
