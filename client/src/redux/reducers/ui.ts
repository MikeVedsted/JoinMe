import {
  UIState,
  UIActions,
  TOGGLE_NAV_DROPDOWN,
  TOGGLE_MODAL
} from '../../Types'

const initState: UIState = {
  hideNavDropdown: true,
  hideModal: true
}

export default function ui(
  state: UIState = initState,
  action: UIActions
): UIState {
  switch (action.type) {
    case TOGGLE_NAV_DROPDOWN:
      const { hideNavDropdown } = action.payload
      return { ...state, hideNavDropdown: hideNavDropdown }
    case TOGGLE_MODAL:
      const { hideModal } = action.payload
      return { ...state, hideModal: hideModal }
    default:
      return state
  }
}
