import { ADD_USER, REMOVE_USER, UserActions, UserInState } from '../../Types'

export function addUser(user: UserInState): UserActions {
  return {
    type: ADD_USER,
    payload: {
      user
    }
  }
}

export function removeUser() {
  return {
    type: REMOVE_USER
  }
}
