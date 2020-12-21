import { IconProp } from '@fortawesome/fontawesome-svg-core'

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
  email: string
  first_name: string
  last_name: string
  profile_image: string
  base_address?: string
  date_of_birth?: any
  gender?: string
  profile_text?: string
  user_id: string
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
  modifier?: 'primary' | 'secondary' | 'large-active' | 'large'
  onClick?: (() => void) | ((id: any) => void)
  id?: string
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
  value?: string | number
  min?: number
  step?: number
  onChange?: () => void
  placeholder?: string
  readOnly?: boolean
  modifier?: string
  required?: boolean
  className?: string
}
export type DropdownProps = {
  label: string
  id: string
  options: string[]
  onBlur: () => void
  required?: boolean
}

export type EventType = {
  event_id: string
  created_by: string
  created_at: string
  image: string
  title: string
  date: string
  time: string
  address: string
  participants: number
  max_participants: number
  description: string
  handleAddRequest: () => void
}

export type ModalProps = {
  closeModal: () => void
  content?: any
}

export type NavDropdownLinkProps = {
  text: string
  icon: IconProp
  destination: string
}

export type NavDropdownFunctionProps = {
  text: string
  icon: IconProp
  handler: () => void
}

export type NavDropdownProps = {
  display: boolean
  setDropdownHidden: (option: boolean) => void
  userId: string
}

export type AccountFormProps = {
  user: User
}

export type InputTextAreaProps = {
  id: string
  label: string
  value?: string | number
  onChange?: () => void
  placeholder?: string
  readOnly?: boolean
  modifier?: string
  required?: boolean
  className?: string
  rows?: number
}
