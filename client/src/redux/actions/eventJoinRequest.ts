import axios from 'axios'
import { Dispatch } from 'redux'

import { clearErrors, setErrors } from './error'
import { setLoaded, setLoading } from './loading'

export const rejectJoinRequest = (requestId: string | undefined) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/requests/${requestId}/reject`)
    dispatch(clearErrors())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}

export const approveJoinRequest = (requestId: string | undefined) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.post(`/api/v1/requests/${requestId}/accept`)
    dispatch(clearErrors())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}
