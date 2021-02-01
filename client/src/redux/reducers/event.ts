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
      let { allEvents } = action.payload
      return { ...state, allEvents: allEvents }
    case FETCH_HOSTED_EVENT_SUCCESS:
      let { hostedEvents } = action.payload
      return { ...state, hostedEvents: hostedEvents }
    case FETCH_REQUESTED_EVENT_SUCCESS:
      let { requestedEvents } = action.payload
      return { ...state, requestedEvents: requestedEvents }
    case FETCH_CONFIRMED_EVENT_SUCCESS:
      let { confirmedEvents } = action.payload
      return { ...state, confirmedEvents: confirmedEvents }
    case END_EVENT_SUCCESS:
      let { eventId } = action.payload
      let all = state.allEvents
      let hosted = state.hostedEvents
      let indexAll = state.allEvents.findIndex(
        (event) => (event.event_id = eventId)
      )
      const indexHosted = state.hostedEvents.findIndex(
        (event) => (event.event_id = eventId)
      )
      all.splice(indexAll, 1)
      hosted.splice(indexHosted, 1)
      return {
        ...state,
        allEvents: all,
        hostedEvents: hosted
      }
    case CANCEL_REQUEST_SUCCESS:
      let { requestId } = action.payload
      let requested = state.requestedEvents
      let indexRequested = state.requestedEvents.findIndex(
        (event) => (event.event_id = requestId)
      )
      requested.splice(indexRequested, 1)
      return {
        ...state,
        requestedEvents: requested
      }
    case GET_EVENT_COMMENTS_SUCCESS:
      eventId = action.payload.eventId
      indexAll = state.allEvents.findIndex(
        (event) => event.event_id === eventId
      )
      let { comments } = action.payload
      all = state.allEvents
      all[indexAll].comments = comments
      return { ...state, allEvents: all }
    case ADD_COMMENT:
      let { comment } = action.payload
      eventId = action.payload.comment.event
      indexAll = state.allEvents.findIndex(
        (event) => event.event_id === eventId
      )
      all = [...state.allEvents]
      all[indexAll].comments.push(comment)
      return { ...state, allEvents: all }
    default:
      return state
  }
}
