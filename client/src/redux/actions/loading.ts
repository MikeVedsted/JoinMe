import { SET_LOADING, SET_LOADED } from '../../Types'

export const setLoading = () => {
  return { type: SET_LOADING }
}

export const setLoaded = () => {
  return { type: SET_LOADED }
}
