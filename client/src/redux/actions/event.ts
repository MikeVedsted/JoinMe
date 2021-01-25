import { Dispatch } from 'redux'
import axios from 'axios'
import {
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_SUCCEED,
  FETCH_EVENTS_FAILED,
  SearchParams,
  CommentSubmission
} from '../../Types'
import { clearErrors, setErrors } from './error'
import { setLoaded, setLoading } from './loading'
import { closeModal } from './ui'

export const fetchAllEvents = (searchParams: SearchParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: FETCH_EVENTS_REQUESTED })
    const { data } = await axios.get('/api/v1/events', {
      params: {
        category: searchParams.category,
        lat: searchParams.location.lat,
        lng: searchParams.location.lng,
        distance: searchParams.distance
      }
    })
    return dispatch(fetchEventsSucceed(data))
  } catch (error) {
    return dispatch(fetchEventsFailed(error))
  }
}

const fetchEventsSucceed = (data: any) => {
  return {
    type: FETCH_EVENTS_SUCCEED,
    payload: data
  }
}

const fetchEventsFailed = (error: any) => {
  return {
    type: FETCH_EVENTS_FAILED,
    payload: error
  }
}

export const addCommentToEvent = async (
  eventId: string,
  comment: CommentSubmission
) => {
  const { data } = await axios.post(`/api/v1/comments/${eventId}`, comment)
  return data
}

export const endEvent = (event_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/events/${event_id}`)
    dispatch(clearErrors())
    dispatch(closeModal())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(closeModal())
    dispatch(setLoaded())
  }
}

export const cancelJoinRequest = (requestId: string | undefined) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/requests/${requestId}/cancel`)
    dispatch(clearErrors())
    dispatch(closeModal())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(closeModal())
    dispatch(setLoaded())
  }
}

export const leaveEvent = (participantId: string | undefined) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/requests/${participantId}/leave`)
    dispatch(clearErrors())
    dispatch(closeModal())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(closeModal())
    dispatch(setLoaded())
  }
}
