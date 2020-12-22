import { Request } from 'express'

export type GoogleToken = {
  given_name: string
  family_name: string
  email: string
  picture: string
}

export type Event = {
  title: string
  category: number
  date: string
  time: string
  description: string
  max_participants: number
  address: Address
  expires_at: Date
  image: string
  created_by: string
}

export type User = {
  user_id: string
  first_name: string
  last_name: string
  email: string
  profile_image: string
  profile_text?: string
  address?: Address
  base_address?: string | Address
  created_at: Date
  date_of_birth: Date
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say'
}

export type JwtDecoded = {
  sub: string
}

export type AuthRequest = Request & {
  user?: User
}

export type Address = {
  street: string
  number: number
  postal_code: number
  city: string
  country: string
  lat: number
  lng: number
}
