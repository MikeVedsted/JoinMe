import {
  TOGGLE_NAV_DROPDOWN,
  TOGGLE_MODAL,
  CLOSE_MODAL,
  CLOSE_NAV_DROPDOWN
} from '../../Types'

export const toggleNavDropdown = (navDropdownState: boolean) => {
  return {
    type: TOGGLE_NAV_DROPDOWN,
    payload: { hideNavDropdown: !navDropdownState }
  }
}

export const toggleModal = (modalState: boolean) => {
  return {
    type: TOGGLE_MODAL,
    payload: {
      hideModal: !modalState
    }
  }
}

export const CloseNavDropdown = () => {
  return {
    type: CLOSE_NAV_DROPDOWN
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}
