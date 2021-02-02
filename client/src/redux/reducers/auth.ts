import {
  AuthState,
  AuthActions,
  SET_AUTHORIZED,
  SET_UNAUTHORIZED
} from '../../Types'

const initState = {
  isAuthenticated: false
}

export default function auth(
  state: AuthState = initState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case SET_AUTHORIZED:
      return { ...state, isAuthenticated: true }
    case SET_UNAUTHORIZED:
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}
