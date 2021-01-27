import { Dispatch } from 'redux'
import axios from 'axios'
import {
  FETCH_PARTICIPANTS_REQUESTED,
  FETCH_PARTICIPANTS_SUCCEED,
  FETCH_PARTICIPANTS_FAILED
} from '../../Types'

import { setLoaded, setLoading } from './loading'
import { clearErrors, setErrors } from './error'

export const fetchAllParticipants = (eventId: String) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: FETCH_PARTICIPANTS_REQUESTED })
    const { data } = await axios.get(`/api/v1/events/${eventId}/participants`)
    return dispatch(fetchParticipantsSucceed(data))
  } catch (error) {
    return dispatch(fetchParticipantsFailed(error))
  }
}

const fetchParticipantsSucceed = (data: any) => {
  return {
    type: FETCH_PARTICIPANTS_SUCCEED,
    payload: data
  }
}

const fetchParticipantsFailed = (error: any) => {
  return {
    type: FETCH_PARTICIPANTS_FAILED,
    payload: error
  }
}

export const deleteParticipant = (participantId: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/requests/${participantId}/remove-participant`)
    dispatch(clearErrors())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}
