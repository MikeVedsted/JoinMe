import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllEvents } from '../redux/actions/event'
import { AppState } from '../Types'

const useEventDisplay = () => {
  const dispatch = useDispatch()
  const { allEvents } = useSelector((state: AppState) => state.event)

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
    dispatch(fetchAllEvents(searchConditions))
  }

  useEffect(() => {
    dispatch(fetchAllEvents(searchConditions))
  }, [])

  return { allEvents, handleFieldChange, handleAddressChange, handleSearch }
}

export default useEventDisplay
