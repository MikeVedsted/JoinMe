import { useState, useEffect } from 'react'
import axios from 'axios'

const useParticipatingEvents = () => {
  const [participatingEvents, setParticipatingEvents] = useState([])

  useEffect(() => {
    fetchParticipatingEvents()
  }, [])

  const fetchParticipatingEvents = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/participant`)
      setParticipatingEvents(data)
    } catch (error) {
      console.log(error)
    }
  }
  return [participatingEvents]
}

export default useParticipatingEvents
