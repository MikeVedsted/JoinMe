import { SET_ERRORS, CLEAR_ERRORS } from '../../Types'

export const setErrors = (status: number, message: string) => {
  return {
    type: SET_ERRORS,
    payload: { status, message }
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
