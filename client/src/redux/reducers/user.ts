import { UserState, UserActions, ADD_USER, REMOVE_USER } from '../../types'

export default function user(
  state: UserState = {
    user: []
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload
      if (state.user.find((p) => p.email === user.email)) {
        return state
      }
      // Always return new state (e.g, new object) if changed
      return { ...state, user: [...state.user, user] }
    }
    // FIX This is not implemented anywhere. Delete me on refactoring or keep me for future
    case REMOVE_USER: {
      const { user } = action.payload
      const index = state.user.findIndex((p) => p.email === user.email)
      if (index >= 0) {
        state.user.splice(index, 1)
        return { ...state, user: [...state.user] }
      }
      return state
    }

    default:
      return state
  }
}
