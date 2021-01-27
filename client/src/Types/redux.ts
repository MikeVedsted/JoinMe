import { UserInState, EventObject, Participant, Requester } from './index'

// ==== //
// @APP //
// ==== //

export type AppState = {
  loading: LoadingState
  error: ErrorState
  event: EventState
  user: UserState
  auth: AuthState
  ui: UIState
  participants: ParticipantsState
}

// ====== //
// @EVENT //
// ====== //

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

// ===== //
// @USER //
// ===== //

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
  created_at: string
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

// ===== //
// @AUTH //
// ===== //

export const SET_AUTHORIZED = 'SET_AUTHORIZED'
export const SET_UNAUTHORIZED = 'SET_UNAUTHORIZED'

export type AuthActions = setAuthorizedAction | setUnauthorizedAction

export type AuthState = {
  isAuthenticated: boolean
}

export type setAuthorizedAction = {
  type: typeof SET_AUTHORIZED
}
export type setUnauthorizedAction = {
  type: typeof SET_UNAUTHORIZED
}

// === //
// @UI //
// === //

export const CLOSE_MODAL = 'CLOSE_MODAL'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const CLOSE_NAV_DROPDOWN = 'CLOSE_NAV_DROPDOWN'
export const TOGGLE_NAV_DROPDOWN = 'TOGGLE_NAV_DROPDOWN'

export type UIActions =
  | ToggleNavDropdown
  | CloseNavDropdown
  | ToggleModal
  | CloseModal

export type UIState = {
  hideNavDropdown: boolean
  hideModal: boolean
}

export type CloseNavDropdown = {
  type: typeof CLOSE_NAV_DROPDOWN
}

export type ToggleNavDropdown = {
  type: typeof TOGGLE_NAV_DROPDOWN
  payload: {
    hideNavDropdown: boolean
  }
}

export type CloseModal = {
  type: typeof CLOSE_MODAL
}

export type ToggleModal = {
  type: typeof TOGGLE_MODAL
  payload: {
    hideModal: boolean
  }
}

// ====== //
// @ERROR //
// ====== //

export const SET_ERRORS = 'SET_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export type ErrorActions = any

export type ErrorState = {
  status: number
  message: string
}

// ======== //
// @LOADING //
// ======== //

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

// ======== //
// @Participants //
// ======== //

export const FETCH_PARTICIPANTS_FAILED = 'FETCH_PARTICIPANTS_FAILED'
export const FETCH_PARTICIPANTS_SUCCEED = 'FETCH_PARTICIPANTS_SUCCEED'
export const FETCH_PARTICIPANTS_REQUESTED = 'FETCH_PARTICIPANTS_REQUESTED'

export type ParticipantsActions = FetchParticipantsActions

export type ParticipantsState = {
  participants: Participant[]
}

export type FetchParticipantsActions =
  | FetchParticipantRequested
  | FetchParticipantSucceed
  | FetchParticipantFailed

export type FetchParticipantRequested = {
  type: typeof FETCH_PARTICIPANTS_REQUESTED
}

export type FetchParticipantSucceed = {
  type: typeof FETCH_PARTICIPANTS_SUCCEED
  payload: Participant[]
}

export type FetchParticipantFailed = {
  type: typeof FETCH_PARTICIPANTS_FAILED
  payload: {
    status: string | ''
    message: string
  }
}
