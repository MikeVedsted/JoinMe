import {
  LoadingState,
  LoadingActions,
  SET_LOADING,
  SET_LOADED
} from '../../Types'

const initState = {
  loading: false
}

export default function error(
  state: LoadingState = initState,
  action: LoadingActions
): LoadingState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }
    case SET_LOADED:
      return { ...state, loading: false }
    default:
      return state
  }
}
