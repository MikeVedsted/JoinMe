import {
  EventState,
  EventActions,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_HOSTED_EVENT_SUCCESS,
  FETCH_REQUESTED_EVENT_SUCCESS,
  FETCH_CONFIRMED_EVENT_SUCCESS,
  END_EVENT_SUCCESS,
  CANCEL_REQUEST_SUCCESS
} from '../../Types'

const initState: EventState = {
  allEvents: [],
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
      const hostedEvents = action.payload
      return { ...state, hostedEvents: hostedEvents.hostedEvents }
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
    default:
      return state
  }
}

// const index = state.inCart.findIndex((p) => p.name === hat.name)
// if (index >= 0) {
//   state.inCart.splice(index, 1)
//   return { ...state, inCart: [...state.inCart] }
// }
// return state
