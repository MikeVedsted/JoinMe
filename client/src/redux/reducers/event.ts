import {
  EventState,
  EventActions,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_HOSTED_EVENT_SUCCESS,
  FETCH_REQUESTED_EVENT_SUCCESS,
  FETCH_CONFIRMED_EVENT_SUCCESS,
  END_EVENT_SUCCESS,
  CANCEL_REQUEST_SUCCESS,
  GET_EVENT_COMMENTS_SUCCESS,
  ADD_COMMENT,
  EventObject
} from '../../Types'

const initState: EventState = {
  allEvents: [] as EventObject[],
  hostedEvents: [],
  requestedEvents: [],
  confirmedEvents: []
}

export default function event(
  state: EventState = initState,
  action: EventActions
): EventState {
  switch (action.type) {
    case FETCH_ALL_EVENTS_SUCCESS:
      const { allEvents } = action.payload
      return { ...state, allEvents: allEvents }
    case FETCH_HOSTED_EVENT_SUCCESS:
      const { hostedEvents } = action.payload
      return { ...state, hostedEvents: hostedEvents }
    case FETCH_REQUESTED_EVENT_SUCCESS:
      const { requestedEvents } = action.payload
      return { ...state, requestedEvents: requestedEvents }
    case FETCH_CONFIRMED_EVENT_SUCCESS:
      const { confirmedEvents } = action.payload
      return { ...state, confirmedEvents: confirmedEvents }
    case END_EVENT_SUCCESS:
      const { eventId } = action.payload
      const allWithoutCancelled = state.allEvents
      const hostedWithoutCancelled = state.hostedEvents
      const indexAll = state.allEvents.findIndex(
        (event) => (event.event_id = eventId)
      )
      if (indexAll >= 0) {
        allWithoutCancelled.splice(indexAll, 1)
      }
      const indexHosted = state.hostedEvents.findIndex(
        (event) => (event.event_id = eventId)
      )
      if (indexHosted >= 0) {
        hostedWithoutCancelled.splice(indexHosted, 1)
      }
      return {
        ...state,
        allEvents: allWithoutCancelled,
        hostedEvents: hostedWithoutCancelled
      }
    case CANCEL_REQUEST_SUCCESS:
      const { requestId } = action.payload
      const requestedWithoutRequest = state.requestedEvents
      const index = state.requestedEvents.findIndex(
        (event) => (event.event_id = requestId)
      )
      if (index >= 0) {
        requestedWithoutRequest.splice(index, 1)
      }
      return {
        ...state,
        requestedEvents: requestedWithoutRequest
      }
    case GET_EVENT_COMMENTS_SUCCESS:
      const id = action.payload.eventId
      const eventIndex = state.allEvents.findIndex(
        (toCheck) => toCheck.event_id === id
      )
      const { comments } = action.payload
      const allWithComments = state.allEvents
      allWithComments[eventIndex].comments = comments
      return { ...state, allEvents: allWithComments }
    case ADD_COMMENT:
      const { comment } = action.payload
      const { event } = action.payload.comment
      const indexToAddTo = state.allEvents.findIndex(
        (toCheck) => toCheck.event_id === event
      )
      let events = [...state.allEvents]
      events[indexToAddTo].comments.push(comment)
      return { ...state, allEvents: events }
    default:
      return state
  }
}
