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
  address: {
    street: string
    number: number
    postal_code: number
    city: string
    country: string
    lat: number
    lng: number
  }
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
  base_address?: string
  created_at: Date
}

export type JwtDecoded = {
  sub: string
}

export type AuthRequest = Request & {
  user?: User
}
