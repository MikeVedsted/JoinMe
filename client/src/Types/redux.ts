import { UserInState, EventObject } from './index'

export const ADD_USER = 'ADD_USER'
export const GET_ERRORS = 'GET_ERRORS'
export const REMOVE_USER = 'REMOVE_USER'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED'
export const FETCH_EVENTS_SUCCEED = 'FETCH_EVENTS_SUCCEED'
export const FETCH_EVENTS_REQUESTED = 'FETCH_EVENTS_REQUESTED'

export type UserActions = AddUserAction | RemoveUserAction
export type EventActions = FetchEventActions

export type AppState = {
  event: EventState
  user: UserState
  auth: any
}

export type EventState = {
  allEvents: EventObject[]
  status: string
  message: string
  loading: boolean
}

export type UserState = {
  user: UserInState
  status: string
  message: string
  loading: boolean
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
