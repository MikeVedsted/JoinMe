import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllParticipants } from '../redux/actions/participants'
import { AppState } from '../Types'

const useEventParticipants = (eventId: String) => {
  const dispatch = useDispatch()

  const { participants } = useSelector((state: AppState) => state.participants)

  useEffect(() => {
    dispatch(fetchAllParticipants(eventId))
  }, [])

  return [participants]
}

export default useEventParticipants
