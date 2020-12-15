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

export type AutoCompleteProps = {
  handleAddress: (a: any) => void
}

export type AddressSelection = {
  address_components: AddressComponent[]
  formatted_address: string
  place_id: string
}

export type AddressComponent = {
  long_name: string
  types: string[]
}

export type Address = {
  number: string
  street: string
  city: string
  postalCode: string
  country: string
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

export type ModalProps = {
  closeModal: () => void
  content?: any
}
