import { Dispatch } from 'redux'
import axios from 'axios'
import {
  FETCH_PARTICIPANTS_REQUESTED,
  FETCH_PARTICIPANTS_SUCCEED,
  FETCH_PARTICIPANTS_FAILED
} from '../../Types'

import { Participant } from '../../Types/index'

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
