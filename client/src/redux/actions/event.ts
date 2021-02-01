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
  SearchParams,
  CommentSubmission,
  EventSubmission,
  EventObject,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_HOSTED_EVENT_SUCCESS,
  FETCH_REQUESTED_EVENT_SUCCESS,
  FETCH_CONFIRMED_EVENT_SUCCESS,
  END_EVENT_SUCCESS,
  CANCEL_REQUEST_SUCCESS,
  GET_EVENT_COMMENTS_SUCCESS,
  ADD_COMMENT
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
      allEvents
    }
  }
}

const fetchHostedEventsSuccess = (hostedEvents: EventObject[]) => {
  return {
    type: FETCH_HOSTED_EVENT_SUCCESS,
    payload: {
      hostedEvents
    }
  }
}

const fetchRequestedEventsSuccess = (requestedEvents: EventObject[]) => {
  return {
    type: FETCH_REQUESTED_EVENT_SUCCESS,
    payload: {
      requestedEvents
    }
  }
}
const fetchConfirmedEventsSuccess = (confirmedEvents: EventObject[]) => {
  return {
    type: FETCH_CONFIRMED_EVENT_SUCCESS,
    payload: {
      confirmedEvents
    }
  }
}

export const getEventComments = (eventId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await axios.get(`/api/v1/comments/${eventId}`)
    dispatch(getEventCommentsSuccess(data, eventId))
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
  }
}

export const getEventCommentsSuccess = (
  comments: Comment[],
  eventId: string
) => {
  return {
    type: GET_EVENT_COMMENTS_SUCCESS,
    payload: {
      comments,
      eventId
    }
  }
}

export const addCommentToEvent = (
  eventId: string,
  comment: CommentSubmission
) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post(`/api/v1/comments/${eventId}`, comment)
    dispatch(addComment(data))
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
  }
}

export const addComment = (comment: Comment) => {
  return {
    type: ADD_COMMENT,
    payload: {
      comment
    }
  }
}

export const endEvent = (event_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/events/${event_id}`)
    dispatch(endEventSuccess(event_id))
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

export const endEventSuccess = (eventId: string) => {
  return {
    type: END_EVENT_SUCCESS,
    payload: {
      eventId
    }
  }
}

export const cancelJoinRequest = (requestId: string | undefined) => async (
  dispatch: Dispatch
) => {
  try {
    if (!requestId) {
      throw new Error('Bad request. Missing id.')
    }

    dispatch(setLoading())
    await axios.delete(`/api/v1/requests/${requestId}/cancel`)
    dispatch(cancelJoinRequestAction(requestId))
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

export const cancelJoinRequestAction = (requestId: string) => {
  return {
    type: CANCEL_REQUEST_SUCCESS,
    payload: {
      requestId
    }
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
