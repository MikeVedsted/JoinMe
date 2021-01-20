import { ADD_USER, REMOVE_USER, UserActions, User } from '../../types'

export function addUser(user: User): UserActions {
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
