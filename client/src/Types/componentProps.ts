import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { UserId, EventObject, EventId, Participant, Requester } from './index'

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
  content: any
}

export type FormSliderProps = {
  id: string
  value: string
  minRange?: number
  maxRange?: number
  steps?: number
  initialValue?: number
  onChange: (a: ChangeEvent<HTMLInputElement>) => void
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

export type ProfileImageProps = {
  image: string
  alt: string
  onClick?: () => void
}

export type ModalMessageCancelProps = {
  title: string
  additionalText?: string
  cancelFunction: () => void
  confirmFunction: () => void
}

export type EventUpdateFormProps = {
  data: EventObject
  eventId: EventId
}

export type EventParticipantsAndRequestsProps = {
  participants: Participant[]
  joinRequests: Requester[]
}

export type EventParticipantProps = {
  participant: Participant
}

export type EventJoinRequestProps = {
  requester: Requester
}

export type EventManageDropDownProps = {
  eventId: EventId
}

export type EventListProps = {
  events: EventObject[]
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
  event: EventObject
}

export type EventProps = {
  event: EventObject
}

export type NotFoundProps = {
  message: string
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
  distance: string
}

export type MobileSearchToggleProps = {
  toggle: Dispatch<SetStateAction<boolean>>
  state: boolean
}
