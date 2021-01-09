import { ADD_USER, REMOVE_USER, UserActions, User } from '../../types'

export function addUser(user: User): UserActions {
  return {
    type: ADD_USER,
    payload: {
      user
    }
  }
}

// FIX this is not implemented anywehre. Can remove it on refactoring or keep it in case we need it in future
export function removeUser(user: User): UserActions {
  return {
    type: REMOVE_USER,
    payload: {
      user
    }
  }
}
