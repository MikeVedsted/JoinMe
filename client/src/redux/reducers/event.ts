import {
  EventState,
  EventActions,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_SUCCEED,
  FETCH_EVENTS_FAILED,
  END_EVENT_REQUESTED,
  END_EVENT_SUCCESS,
  END_EVENT_FAIL
} from '../../Types'

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
      const eventResponse = action.payload
      return {
        ...state,
        loading: false,
        allEvents: eventResponse.events
      }

    case FETCH_EVENTS_FAILED:
      const eventError = action.payload
      return {
        ...state,
        loading: false,
        status: 'error',
        message: eventError.message
      }
    case END_EVENT_REQUESTED:
      return { ...state, loading: true, status: '', message: '' }
    case END_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 'Success',
        message: 'Successfully deleted'
      }
    default:
      return state
  }
}
