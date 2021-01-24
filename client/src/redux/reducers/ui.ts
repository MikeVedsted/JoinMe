import {
  UIState,
  UIActions,
  TOGGLE_NAV_DROPDOWN,
  TOGGLE_MODAL
} from '../../Types'

export default function ui(
  state: UIState = {
    hideNavDropdown: true,
    hideModal: true
  },
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
