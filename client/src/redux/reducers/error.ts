import { ErrorState, ErrorActions } from '../../Types'

const initState = {
  status: NaN,
  message: ''
}

export default function error(
  state: ErrorState = initState,
  action: ErrorActions
): ErrorState {
  switch (action.type) {
    default:
      return state
  }
}
