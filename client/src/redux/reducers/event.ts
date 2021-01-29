import {
  EventState,
  EventActions,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_HOSTED_EVENT_SUCCESS,
  FETCH_REQUESTED_EVENT_SUCCESS,
  FETCH_CONFIRMED_EVENT_SUCCESS
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
  console.log('xoxo--', state)
  switch (action.type) {
    case FETCH_ALL_EVENTS_SUCCESS:
      const { allEvents } = action.payload
      return { ...state, allEvents: allEvents }
    case FETCH_HOSTED_EVENT_SUCCESS:
      const hostedEvents = action.payload
      console.log('in reducer--', hostedEvents, action.payload)
      return { ...state, hostedEvents: hostedEvents.hostedEvents }
    case FETCH_REQUESTED_EVENT_SUCCESS:
      const { requestedEvents } = action.payload
      return { ...state, requestedEvents: requestedEvents }
    case FETCH_CONFIRMED_EVENT_SUCCESS:
      const { confirmedEvents } = action.payload
      return { ...state, confirmedEvents: confirmedEvents }
    default:
      return state
  }
}
