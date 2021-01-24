import { Dispatch } from 'redux'
import { UIActions, TOGGLE_NAV_DROPDOWN, TOGGLE_MODAL } from '../../Types'

export const toggleNavDropdown = (navDropdownState: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: TOGGLE_NAV_DROPDOWN,
    payload: {
      hideNavDropdown: !navDropdownState
    }
  })
}

export const ToggleModal = (modalState: boolean): UIActions => {
  return {
    type: TOGGLE_MODAL,
    payload: {
      hideModal: !modalState
    }
  }
}
