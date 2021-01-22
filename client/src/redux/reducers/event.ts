import Event from '../../components/Event'
import {
  EventState,
  EventActions,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_SUCCEED,
  FETCH_EVENTS_FAILED
} from '../../types'

export default function event(
  state: EventState = {
    allEvents: [],
    loading: false,
    status: '',
    message: ''
  },
  action: EventActions
): EventState {
  switch (action.type) {
    case FETCH_EVENTS_REQUESTED:
      return { ...state, loading: true }

    case FETCH_EVENTS_SUCCEED:
      const eventRespone = action.payload
      return {
        ...state,
        loading: false,
        allEvents: eventRespone.events
      }

    case FETCH_EVENTS_FAILED:
      const eventError = action.payload
      return {
        ...state,
        loading: false,
        status: 'error',
        message: eventError.message
      }
    default:
      return state
  }
}
