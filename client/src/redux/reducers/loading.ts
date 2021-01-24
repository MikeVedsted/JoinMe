import { LoadingState, LoadingActions } from '../../Types'

const initState = {
  loading: false
}

export default function error(
  state: LoadingState = initState,
  action: LoadingActions
): LoadingState {
  switch (action.type) {
    default:
      return state
  }
}
