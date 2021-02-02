import axios from 'axios'
import { Dispatch } from 'redux'

import { ADD_USER, REMOVE_USER, UserActions, UserInState } from '../../Types'
import { clearErrors, setErrors } from './error'
import { setLoaded, setLoading } from './loading'

export function setUser(user: UserInState): UserActions {
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

export const updateUser = (
  userId: string,
  update: Partial<UserInState>
) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    dispatch(clearErrors())
    const { data } = await axios.put(`/api/v1/users/${userId}`, update)
    dispatch(setUser(data))
    dispatch(setErrors('200', 'Success'))
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}
