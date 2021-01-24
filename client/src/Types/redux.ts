import { UserInState, EventObject } from './index'

export const ADD_USER = 'ADD_USER'
export const GET_ERRORS = 'GET_ERRORS'
export const REMOVE_USER = 'REMOVE_USER'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED'
export const FETCH_EVENTS_SUCCEED = 'FETCH_EVENTS_SUCCEED'
export const FETCH_EVENTS_REQUESTED = 'FETCH_EVENTS_REQUESTED'

export const END_EVENT_REQUESTED = 'END_EVENT_REQUESTED'
export const END_EVENT_SUCCESS = 'END_EVENT_SUCCESS'
export const END_EVENT_FAIL = 'END_EVENT_FAIL'

export type UserActions = AddUserAction | RemoveUserAction
export type EventActions = FetchEventActions | EndEventActions

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

export type EndEventActions = EndEventRequested | EndEventSuccess | EndEventFail

export type EndEventRequested = {
  type: typeof END_EVENT_REQUESTED
  payload: {
    status: string
    message: string
  }
}
export type EndEventSuccess = {
  type: typeof END_EVENT_SUCCESS
  payload: {
    status: string
    message: string
  }
}

export type EndEventFail = {
  type: typeof END_EVENT_FAIL
  payload: {
    status: string
    message: string
  }
}
