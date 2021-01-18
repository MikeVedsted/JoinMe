import { useState, useEffect } from 'react'
import axios from 'axios'

import { EventType } from '../types'

const useEventDisplay = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [searchConditions, setSearchConditions] = useState({
    category: '',
    location: {
      lat: '',
      lng: ''
    },
    distance: ''
  })
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchConditions({
      ...searchConditions,
      [e.target.id]: e.target.value
    })
  }

  const handleAddressChange = (a: any) => {
    setSearchConditions({
      ...searchConditions,
      location: { lat: a.lat, lng: a.lng }
    })
  }

  const handleSearch = () => {
    fetchEvents()
  }

  useEffect(() => {
    fetchEvents()
  }, [events])

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('/api/v1/events', {
        params: {
          category: searchConditions.category,
          lat: searchConditions.location.lat,
          lng: searchConditions.location.lng,
          distance: searchConditions.distance
        }
      })
      setEvents(data)
    } catch (error) {
      throw error
    }
  }
  return { events, handleFieldChange, handleAddressChange, handleSearch }
}

export default useEventDisplay
