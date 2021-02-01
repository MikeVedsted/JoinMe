import { Dispatch } from 'redux'
import axios from 'axios'

import { setErrors } from './error'
import { setUser, removeUser } from './user'
import { setLoaded, setLoading } from './loading'
import { closeModal, closeNavDropdown } from './ui'
import { SET_AUTHORIZED, SET_UNAUTHORIZED } from '../../Types'

export const authenticateUser = (id_token: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    const { data } = await axios.post('/api/v1/users/google-authenticate', {
      id_token: id_token
    })
    dispatch(setUser(data))
    dispatch(setAuthorized())
    dispatch(closeNavDropdown())
    dispatch(closeModal())
    dispatch(setLoaded())
    const { created_at, user_id } = data
    return { created_at, user_id }
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
  }
}

export const logout = () => (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    // ADD ASYNC POST REQUEST TO LOG OUT WHEN BUILT ON BACKEND
    dispatch(removeUser())
    dispatch(closeNavDropdown())
    dispatch(setUnauthorized())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
  }
}

export const verifyToken = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading())
    const { data } = await axios.get('/api/v1/users/verify-token')
    console.log(data)
    if (data.message === 'jwt expired') {
      dispatch(removeUser())
      dispatch(setUnauthorized())
    } else {
      dispatch(setAuthorized())
    }
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
  }
}

export const setAuthorized = () => {
  return {
    type: SET_AUTHORIZED
  }
}

export const setUnauthorized = () => {
  return {
    type: SET_UNAUTHORIZED
  }
}
