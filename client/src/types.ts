import { IconProp } from '@fortawesome/fontawesome-svg-core'

export const FETCH_EVENTS_REQUESTED = 'FETCH_EVENTS_REQUESTED'
export const FETCH_EVENTS_SUCCEED = 'FETCH_EVENTS_SUCCEED'
export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED'

export const GET_ERRORS = 'GET_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'

export type AppState = {
  event: EventState
  user: UserState
  auth: any
  ui: UiState
}

export type EventState = {
  allEvents: EventType[]
  status: string
  message: string
  loading: boolean
}

export type UserState = {
  user: User
  status: string
  message: string
  loading: boolean
}

export type UiState = {
  isModalOpen: boolean
  isDropDownOpen: boolean
}

export type User = {
  user_id: string
  email: string
  first_name: string
  last_name: string
  date_of_birth: any
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
    user: User
  }
}

export type RemoveUserAction = {
  type: typeof REMOVE_USER
  payload: {
    user: User
  }
}

export type UserActions = AddUserAction | RemoveUserAction
export type EventActions = FetchEventActions

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

export type EventType = {
  key: string
  category: string
  created_by: string
  created_at: string
  image: string
  title: string
  date: string
  time: string
  expires_at: string
  participants: number
  max_participants: number
  description: string
  handleAddRequest: () => void
  event_id: EventId
  first_name?: string
  last_name?: string
  street: string
  number: string
  postal_code: string
  city: string
  er_id?: string
  ep_id?: string
  is_owner?: boolean
  is_requested?: boolean
  is_confirmed?: boolean
}

// ============ //
//  ACTIONS     //
// ============ //

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
    events: EventType[]
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

// ============ //
//  PROPS       //
// ============ //

export type ProtectedRouteProps = {
  component?: any
  exact?: boolean
  path: string
  children?: any
}

export type ButtonProps = {
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
  onBlur: (searchValue: any) => void
  modifier?: string
  required?: boolean
  selectedValue?: string
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
  onChange: (a: any) => void
}

export type NavDropdownLinkProps = {
  text: string
  icon: IconProp
  destination: string
  setDropdownHidden: (option: boolean) => void
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
  userId: UserId
}

export type EventEditPageParamProps = {
  eventId: EventId
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
  handleFieldChange: (e: any) => void
  distance: string
  setAddress: (a: any) => void
}

export type CommentProps = {
  image: string
  name: string
  id: string
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

export type Participant = {
  ep_id: string
  first_name: string
  last_name: string
  profile_image: string
  user_id: string
}

export type Requester = {
  er_id: string
  first_name: string
  last_name: string
  profile_image: string
  user_id: string
}

export type EventParticipantProps = {
  participant: Participant
}

export type EventJoinRequestProps = {
  requester: Requester
}

export type EventManageDropDownProps = {
  showParticipants: () => void
  endEvent: () => void
  editEvent: () => void
  modifier: string
}

export type EventListProps = {
  events: EventType[]
  title?: string
  type?: 'hosted' | 'interested' | 'confirmed'
}

export type EventImageProps = {
  src?: string
  alt?: string
}

export type EventTitleProps = {
  title: string
  createdAt: string
}

export type EventDataBoxProps = {
  event: EventType
}

export type EventProps = {
  event: EventType
}

export type EventParticipantsAndRequestsProps = {
  participants: Participant[]
  joinRequests: Requester[]
}

export type EventUpdateFormProps = {
  data: EventType
  eventId: EventId
}

export type ModalMessageCancelProps = {
  title: string
  additionalText: string
  cancelFunction: () => void
  confirmFunction: () => void
}

export type ProfileImageProps = {
  image: string
  alt: string
  onClick?: () => void
}

export type SearchParamsProps = {
  category: string
  location: {
    lat: string
    lng: string
  }
  distance: string
}

export type CommentSubmission = {
  comment: string
}
