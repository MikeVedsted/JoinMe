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

export type UserType = {
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
    user: UserType
    isAuthenticated: boolean
  }
}

export type ButtonComponent = {
  type: 'button' | 'submit' | 'reset'
  text: string
  modifier?:
    | 'primary'
    | 'secondary'
    | 'large-active'
    | 'large'
    | 'inline'
    | 'disabled'
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
  modifier?: string
  required?: boolean
}

export type EventType = {
  key: string
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
  event_id: EventId
}

export type ModalProps = {
  closeModal: () => void
  content?: any
}

export type FormSliderProps = {
  id: string
  value: string
  minRange?: number
  maxRange?: number
  steps?: number
  initialValue?: number
  onChange: () => void
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
  userId: UserId
}

export type ProfilePageParamProps = {
  userId: string
}

export type AccountFormProps = {
  userId: UserId
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

export type EventSearchProps = {
  handleSubmit: () => void
  handleFieldChange: () => void
  distance: string
  setAddress: (a: any) => void
}

export type CommentProps = {
  image: string
  user: string
  text: string
  date: string
}

export type CommentSectionProps = {
  eventId: EventId
}

export type EventCommentInputProps = {
  eventId: EventId
}

export type UserId = string
export type EventId = string

export type Comment = any

export type NotFoundProps = {
  message: string
}

export type EventParticipantProps = {
  user: UserType
  handleDelete: () => void
}

export type EventJoinRequestProps = {
  user: UserType
}

export type EventManageDropDownProps = {
  showParticipants: () => void
  endEvent: () => void
  editEvent: () => void
  modifier: string
}

export type EventParticipantsAndRequestsProps = {
  participants: UserType[]
  joinRequests: UserType[]
}
