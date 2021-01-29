import { Dispatch } from 'redux'
import axios from 'axios'

import {
  clearErrors,
  setErrors,
  setLoaded,
  setLoading,
  closeModal
} from './index'
import {
  FETCH_ALL_EVENTS_SUCCESS,
  SearchParams,
  CommentSubmission,
  EventSubmission,
  FETCH_HOSTED_EVENT_SUCCESS,
  FETCH_REQUESTED_EVENT_SUCCESS,
  FETCH_CONFIRMED_EVENT_SUCCESS,
  EventObject
} from '../../Types'

export const fetchAllEvents = (searchParams: SearchParams) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await axios.get('/api/v1/events', {
      params: {
        category: searchParams.category,
        lat: searchParams.location.lat,
        lng: searchParams.location.lng,
        distance: searchParams.distance
      }
    })
    return dispatch(fetchAllEventsSuccess(data.events))
  } catch (error) {
    const { status, message } = error
    return dispatch(setErrors(status, message))
  }
}

export const getMyEvents = (userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    dispatch(clearErrors())
    let { data } = await axios.get(`/api/v1/events/creator/${userId}`)
    dispatch(fetchHostedEventsSuccess(data))
    data = await axios.get(`/api/v1/events/requested`)
    dispatch(fetchRequestedEventsSuccess(data.data))
    data = await axios.get(`/api/v1/events/participant`)
    dispatch(fetchConfirmedEventsSuccess(data.data))
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}

const fetchAllEventsSuccess = (allEvents: EventObject[]) => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload: {
      allEvents: allEvents
    }
  }
}

const fetchHostedEventsSuccess = (hostedEvents: EventObject[]) => {
  return {
    type: FETCH_HOSTED_EVENT_SUCCESS,
    payload: {
      hostedEvents: hostedEvents
    }
  }
}
const fetchRequestedEventsSuccess = (requestedEvents: EventObject[]) => {
  return {
    type: FETCH_REQUESTED_EVENT_SUCCESS,
    payload: {
      requestedEvents: requestedEvents
    }
  }
}
const fetchConfirmedEventsSuccess = (confirmedEvents: EventObject[]) => {
  return {
    type: FETCH_CONFIRMED_EVENT_SUCCESS,
    payload: {
      confirmedEvents: confirmedEvents
    }
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

export const requestToJoin = (eventId: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.post(`/api/v1/events/${eventId}/request`)
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

export const createEvent = (submission: EventSubmission) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    dispatch(clearErrors())
    await axios.post('/api/v1/events', submission)
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}

export const updateEvent = (
  submission: Partial<EventSubmission>,
  eventId: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    dispatch(clearErrors())
    await axios.put(`/api/v1/events/${eventId}`, submission)
    dispatch(closeModal())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(closeModal())
    dispatch(setLoaded())
  }
}
