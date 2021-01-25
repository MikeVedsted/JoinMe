import {
  EventState,
  EventActions,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_SUCCEED,
  FETCH_EVENTS_FAILED
} from '../../Types'

const initState: EventState = {
  allEvents: [],
  hostedEvents: [],
  interestedEvents: [],
  confirmedEvents: []
}

export default function event(
  state: EventState = initState,
  action: EventActions
): EventState {
  switch (action.type) {
    case FETCH_EVENTS_REQUESTED:
      return { ...state }

    case FETCH_EVENTS_SUCCEED:
      const eventResponse = action.payload
      return { ...state, allEvents: eventResponse.events }
    case FETCH_EVENTS_FAILED:
      return { ...state }
    default:
      return state
  }
}
