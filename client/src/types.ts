export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENTS'
export const GET_ERRORS = 'GET_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export type ProtectedRouteProps = {
  component?: any
  exact?: boolean
  path: string
  children?: any
}

export type User = {
  isAdmin: boolean
}

export type AppState = {
  auth: {
    user: User
    isAuthenticated: boolean
  }
}

// Button component types
export type ButtonComponent = {
  type: 'button' | 'submit' | 'reset'
  text: string
  style?: 'primary' | 'secondary' | 'large-active' | 'large'
  handleClick: () => void
}
