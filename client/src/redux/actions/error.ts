import { GET_ERRORS, CLEAR_ERRORS } from '../../types'

export const returnErrors = (
  message: string,
  status: number,
  id: any = null
) => {
  return {
    type: GET_ERRORS,
    payload: { message, status, id }
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
