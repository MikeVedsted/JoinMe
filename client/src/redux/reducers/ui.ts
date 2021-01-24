import {
  UIState,
  UIActions,
  TOGGLE_NAV_DROPDOWN,
  TOGGLE_MODAL,
  CLOSE_NAV_DROPDOWN,
  CLOSE_MODAL
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
    case CLOSE_NAV_DROPDOWN:
      return { ...state, hideNavDropdown: true }
    case CLOSE_MODAL:
      return { ...state, hideModal: true }
    default:
      return state
  }
}
