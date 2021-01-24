import { AuthState, AuthActions } from '../../Types'

export default function auth(
  state: AuthState = {
    isAuthenticated: false
  },
  action: AuthActions
): AuthState {
  switch (action.type) {
    default:
      return state
  }
}
