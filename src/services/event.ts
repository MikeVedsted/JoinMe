import {
  addressIdByLocQ,
  findAllEventsPopulatedQ,
  createEventQ,
  createAddressQ,
  findEventByIdQ,
  findEventsByCreatorQ,
  updateEventQ,
  deleteEventQ,
  checkRequestStatusQ,
  createNewRequestQ,
  findEventRequestsByUserQ,
  findEventParticipatingQ,
  findParticipantsByEventQ
} from '../db/queries'
import db from '../db'
import { Event } from '../types'

const createEvent = async (event: Event) => {
  try {
    const {
      title,
      category,
      date,
      time,
      description,
      max_participants,
      address,
      expires_at,
      created_by,
      image
    } = event
    const { street, postal_code, city, country, lat, lng } = address
    let { number } = address
    !number && (number = 0)
    let addressId: string

    const DBResponse = await db.query(addressIdByLocQ, [lat, lng])

    if (DBResponse.rowCount === 0) {
      const newAddress = await db.query(createAddressQ, [
        street,
        number,
        postal_code,
        city,
        country,
        lat,
        lng
      ])
      addressId = newAddress.rows[0].address_id
    } else {
      addressId = DBResponse.rows[0].address_id
    }

    const createEvent = await db.query(createEventQ, [
      title,
      category,
      date,
      time,
      description,
      max_participants,
      addressId,
      expires_at,
      created_by,
      image
    ])
    const newEvent: Event = createEvent.rows[0]
    return newEvent
  } catch (error) {
    return error
  }
}

const findAllEvents = async () => {
  try {
    const DBResponse = await db.query(findAllEventsPopulatedQ)
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findEventById = async (eventId: string) => {
  try {
    const DBResponse = await db.query(findEventByIdQ, [eventId])
    const event: Event = DBResponse.rows[0]
    return event
  } catch (error) {
    return error
  }
}

const findEventsByCreator = async (userId: string) => {
  try {
    const DBResponse = await db.query(findEventsByCreatorQ, [userId])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const updateEvent = async (eventId: string, update: Partial<Event>) => {
  try {
    const DBResponse = await db.query(findEventByIdQ, [eventId])
    const event: Event = DBResponse.rows[0]

    if (!event) {
      throw { error: 'Event not found' }
    }

    let { address } = event
    const {
      title = event.title,
      date = event.date,
      time = event.time,
      description = event.description,
      max_participants = event.max_participants,
      expires_at = event.expires_at,
      image = event.image,
      category = event.category
    } = update

    if (update.address) {
      address = update.address
      const { street, number, postal_code, city, country, lat, lng } = address
      const DBAddressResponse = await db.query(addressIdByLocQ, [lat, lng])
      if (DBAddressResponse.rowCount === 0) {
        const newAddress = await db.query(createAddressQ, [
          street,
          number,
          postal_code,
          city,
          country,
          lat,
          lng
        ])
        address = newAddress.rows[0].address_id
      } else {
        address = DBResponse.rows[0].address
      }
    }

    const updateQuery = await db.query(updateEventQ, [
      eventId,
      title,
      date,
      time,
      description,
      max_participants,
      expires_at,
      image,
      category,
      address
    ])
    const updatedEvent: Event = updateQuery.rows[0]
    return updatedEvent
  } catch (error) {
    return error
  }
}

const deleteEvent = async (eventId: string) => {
  const DBResponse = await db.query(findEventByIdQ, [eventId])
  const eventToDelete = DBResponse.rows[0]

  if (!eventToDelete) {
    return { error: 'Event not found' }
  }

  db.query(deleteEventQ, [eventId])
  return { message: 'Event Successfully deleted!' }
}

const requestToJoin = async (eventId: string, userId: string) => {
  const checkIfRequested = await db.query(checkRequestStatusQ, [eventId, userId])

  if (checkIfRequested.rows.length > 0) {
    return { message: 'Already requested' }
  }

  const newRequest = await db.query(createNewRequestQ, [eventId, userId])
  const request = newRequest.rows[0]
  return { message: 'Successfully requested', request }
}

const findRequestedEvents = async (userId: string) => {
  try {
    const DBResponse = await db.query(findEventRequestsByUserQ, [userId])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findParticipatingEvents = async (user_id: string) => {
  try {
    const DBResponse = await db.query(findEventParticipatingQ, [user_id])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findEventParticipants = async (eventId: string) => {
  try {
    const DBResponse = await db.query(findParticipantsByEventQ, [eventId])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

export default {
  createEvent,
  findEventById,
  findEventsByCreator,
  findAllEvents,
  updateEvent,
  deleteEvent,
  requestToJoin,
  findRequestedEvents,
  findParticipatingEvents,
  findEventParticipants
}
