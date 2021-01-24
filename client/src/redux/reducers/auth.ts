import { AuthState, AuthActions } from '../../Types'

const initState = {
  isAuthenticated: false
}

export default function auth(
  state: AuthState = initState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    default:
      return state
  }
}
