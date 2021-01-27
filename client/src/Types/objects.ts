import { EventId } from './index'

export type UserInState = {
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
}

export type UserObject = {
  email: string
  first_name: string
  last_name: string
  profile_image: string
  base_address?: string
  date_of_birth?: string
  gender?: string
  profile_text?: string
  user_id: string
}

export type EventObject = {
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

export type AddressSelection = {
  address_components: AddressComponent[]
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
  postal_code: string
  country?: string
}

export type Comment = {
  date: string
  profile_image: string
  first_name: string
  comment: string
  commented_at: string
  user_id: string
}

export type CommentSubmission = {
  comment: string
}

export type Requester = {
  er_id: string
  first_name: string
  last_name: string
  profile_image: string
  user_id: string
}

export type Participant = {
  ep_id: string
  first_name: string
  last_name: string
  profile_image: string
  user_id: string
}

export type EventSubmission = {
  category: string
  title: string
  date: string
  time: string
  description: string
  max_participants: number
  image: string
  expires_at: string
  address: Address
}
