import {
  EventState,
  EventActions,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_HOSTED_EVENTS_SUCCESS,
  FETCH_REQUESTED_EVENTS_SUCCESS,
  FETCH_CONFIRMED_EVENTS_SUCCESS,
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
    case FETCH_HOSTED_EVENTS_SUCCESS:
      let { hostedEvents } = action.payload
      return { ...state, hostedEvents: hostedEvents }
    case FETCH_REQUESTED_EVENTS_SUCCESS:
      let { requestedEvents } = action.payload
      return { ...state, requestedEvents: requestedEvents }
    case FETCH_CONFIRMED_EVENTS_SUCCESS:
      let { confirmedEvents } = action.payload
      return { ...state, confirmedEvents: confirmedEvents }
    case END_EVENT_SUCCESS:
      const endId = action.payload.eventId
      let allWithoutEnded = [...state.allEvents]
      let hostedWithoutEnded = [...state.hostedEvents]
      const indexAll = state.allEvents.findIndex(
        (event) => (event.event_id = endId)
      )
      const indexHosted = state.hostedEvents.findIndex(
        (event) => (event.event_id = endId)
      )
      allWithoutEnded.splice(indexAll, 1)
      hostedWithoutEnded.splice(indexHosted, 1)
      return {
        ...state,
        allEvents: allWithoutEnded,
        hostedEvents: hostedWithoutEnded
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
      const eventToPopulate = action.payload.eventId
      const { comments } = action.payload
      const eventIndex = state.allEvents.findIndex(
        (event) => event.event_id === eventToPopulate
      )
      const allWithComments = [...state.allEvents]
      allWithComments[eventIndex].comments = comments
      return { ...state, allEvents: allWithComments }
    case ADD_COMMENT:
      const { comment } = action.payload
      const eventToAddTo = action.payload.comment.event
      const eventIndexAll = state.allEvents.findIndex(
        (event) => event.event_id === eventToAddTo
      )
      const allWithComment = [...state.allEvents]
      allWithComment[eventIndexAll].comments.push(comment)
      return { ...state, allEvents: allWithComment }
    default:
      return state
  }
}
