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
export type ButtonComponent = {
  type: 'button' | 'submit' | 'reset'
  text: string
  style?: 'primary' | 'secondary' | 'large-active' | 'large'
  handleClick: () => void
}

export type AddressComponents = {
  address_components: AddressComponent[]
}

export type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

export type InputFieldProps = {
  type: string
  id: string
  label: string
  value?: string
  min?: number
  step?: number
  onChange?: () => void
  placeholder?: string
  readOnly?: boolean
  modifier?: string
}
export type DropdownProps = {
  label: string
  id: string
  options: string[]
  onBlur: () => void
}
