import { LoadingActions, SET_LOADING, SET_LOADED } from '../../Types'

export const setLoading = (): LoadingActions => {
  return { type: SET_LOADING }
}

export const setLoaded = (): LoadingActions => {
  return { type: SET_LOADED }
}
