import axios from 'axios'
import { Dispatch } from 'redux'

import { setLoaded, setLoading } from './loading'
import { clearErrors, setErrors } from './error'

export const deleteParticipant = (participantId: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(setLoading())
    await axios.delete(`/api/v1/requests/${participantId}/remove-participant`)
    dispatch(clearErrors())
    dispatch(setLoaded())
  } catch (error) {
    const { status, message } = error
    dispatch(setErrors(status, message))
    dispatch(setLoaded())
  }
}
