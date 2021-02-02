import { ErrorState, ErrorActions, SET_ERRORS, CLEAR_ERRORS } from '../../Types'

const initState = {
  status: '',
  message: ''
}

export default function error(
  state: ErrorState = initState,
  action: ErrorActions
): ErrorState {
  switch (action.type) {
    case SET_ERRORS:
      const { status, message } = action.payload
      return { ...state, status: status, message: message }
    case CLEAR_ERRORS:
      return { ...state, status: '', message: '' }
    default:
      return state
  }
}
