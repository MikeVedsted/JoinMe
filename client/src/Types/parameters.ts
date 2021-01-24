import { UserId, EventId } from './index'

export type SearchParams = {
  category: string
  location: {
    lat: string
    lng: string
  }
  distance: string
}

export type ProfilePageParams = {
  userId: UserId
}

export type EventEditPageParams = {
  eventId: EventId
}
