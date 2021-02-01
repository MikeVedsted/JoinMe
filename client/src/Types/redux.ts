import { UserInState, EventObject } from './index'
import { CommentResponse } from './objects'

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
}

// ====== //
// @EVENT //
// ====== //

export const FETCH_ALL_EVENTS_SUCCESS = 'FETCH_ALL_EVENTS_SUCCESS'
export const FETCH_HOSTED_EVENT_SUCCESS = 'FETCH_HOSTED_EVENT_SUCCESS'
export const FETCH_REQUESTED_EVENT_SUCCESS = 'FETCH_REQUESTED_EVENT_SUCCESS'
export const FETCH_CONFIRMED_EVENT_SUCCESS = 'FETCH_CONFIRMED_EVENT_SUCCESS'
export const END_EVENT_SUCCESS = 'END_EVENT_SUCCESS'
export const CANCEL_REQUEST_SUCCESS = 'CANCEL_REQUEST_SUCCESS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_EVENT_COMMENTS_SUCCESS = 'GET_EVENT_COMMENTS_SUCCESS'

export type EventActions =
  | FetchAllEventSuccess
  | FetchHostedEventSuccess
  | FetchRequestedEventSuccess
  | FetchConfirmedEventSuccess
  | EndEventSuccess
  | CancelRequestSuccess
  | GetEventCommentsSuccess
  | AddComment

export type EventState = {
  allEvents: EventObject[]
  hostedEvents: EventObject[]
  requestedEvents: EventObject[]
  confirmedEvents: EventObject[]
}

export type FetchAllEventSuccess = {
  type: typeof FETCH_ALL_EVENTS_SUCCESS
  payload: {
    allEvents: EventObject[]
  }
}

export type FetchHostedEventSuccess = {
  type: typeof FETCH_HOSTED_EVENT_SUCCESS
  payload: {
    hostedEvents: EventObject[]
  }
}

export type FetchRequestedEventSuccess = {
  type: typeof FETCH_REQUESTED_EVENT_SUCCESS
  payload: {
    requestedEvents: EventObject[]
  }
}

export type FetchConfirmedEventSuccess = {
  type: typeof FETCH_CONFIRMED_EVENT_SUCCESS
  payload: {
    confirmedEvents: EventObject[]
  }
}

export type EndEventSuccess = {
  type: typeof END_EVENT_SUCCESS
  payload: {
    eventId: string
  }
}

export type CancelRequestSuccess = {
  type: typeof CANCEL_REQUEST_SUCCESS
  payload: {
    requestId: string
  }
}

export type GetEventCommentsSuccess = {
  type: typeof GET_EVENT_COMMENTS_SUCCESS
  payload: {
    comments: CommentResponse[]
    eventId: string
  }
}

export type AddComment = {
  type: typeof ADD_COMMENT
  payload: {
    comment: CommentResponse
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
  interests: string[]
  full_address?: string
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
  status: string
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
