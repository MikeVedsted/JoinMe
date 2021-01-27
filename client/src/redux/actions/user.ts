import axios from 'axios'
import { Dispatch } from 'redux'

import { setLoaded } from './index'

import { ADD_USER, REMOVE_USER, UserActions, UserInState } from '../../Types'

export const fetchUser = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/${userId}`)
    dispatch(setUser(data))
    dispatch(setLoaded())
  } catch (error) {
    console.log(error)
  }
}

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
