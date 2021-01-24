import { UserInState, EventObject } from './index'

// === //
// @APP //
// === //

export type AppState = {
  loading: LoadingState
  error: ErrorState
  event: EventState
  user: UserState
  auth: AuthState
  ui: UIState
}

// ===== //
// @EVENT //
// ===== //

export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED'
export const FETCH_EVENTS_SUCCEED = 'FETCH_EVENTS_SUCCEED'
export const FETCH_EVENTS_REQUESTED = 'FETCH_EVENTS_REQUESTED'

export type EventActions = FetchEventActions

export type EventState = {
  allEvents: EventObject[]
  hostedEvents: EventObject[]
  interestedEvents: EventObject[]
  confirmedEvents: EventObject[]
}

export type FetchEventActions =
  | FetchEventRequested
  | FetchEventSucceed
  | FetchEventFailed

export type FetchEventRequested = {
  type: typeof FETCH_EVENTS_REQUESTED
}

export type FetchEventSucceed = {
  type: typeof FETCH_EVENTS_SUCCEED
  payload: {
    events: EventObject[]
    status: string | ''
    message: string
  }
}

export type FetchEventFailed = {
  type: typeof FETCH_EVENTS_FAILED
  payload: {
    status: string | ''
    message: string
  }
}

// ==== //
// @USER //
// ==== //

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'

export type UserActions = AddUserAction | RemoveUserAction

export type UserState = {
  user_id: string
  email: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  base_address: string
  street: string
  number: string
  city: string
  postal_code: number
  country: string
  lat: number
  lng: number
  profile_text: string
  profile_image: string
}

export type AddUserAction = {
  type: typeof ADD_USER
  payload: {
    user: UserInState
  }
}

export type RemoveUserAction = {
  type: typeof REMOVE_USER
  payload: {
    user: UserInState
  }
}

// ==== //
// @AUTH //
// ==== //

export type AuthActions = any

export type AuthState = {
  isAuthenticated: boolean
}

// === //
// @UI //
// === //

export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const TOGGLE_NAV_DROPDOWN = 'TOGGLE_NAV_DROPDOWN'

export type UIActions = ToggleNavDropdown | ToggleModal

export type UIState = {
  hideNavDropdown: boolean
  hideModal: boolean
}

export type ToggleNavDropdown = {
  type: typeof TOGGLE_NAV_DROPDOWN
  payload: {
    hideNavDropdown: boolean
  }
}

export type ToggleModal = {
  type: typeof TOGGLE_MODAL
  payload: {
    hideModal: boolean
  }
}

// ===== //
// @ERROR //
// ===== //

export const SET_ERRORS = 'SET_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export type ErrorActions = any

export type ErrorState = {
  status: number
  message: string
}

// ======= //
// @LOADING //
// ======= //

export const SET_LOADING = 'SET_LOADING'
export const SET_LOADED = 'SET_LOADED'

export type LoadingActions = SetLoading | SetLoaded

export type LoadingState = {
  loading: boolean
}

export type SetLoading = {
  type: typeof SET_LOADING
}

export type SetLoaded = {
  type: typeof SET_LOADED
}
