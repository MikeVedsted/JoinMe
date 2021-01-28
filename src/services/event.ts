import {
  addressIdByLocQ,
  findAllEventsPopulatedQ,
  findRawEventByIdQ,
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
      expires_at,
      created_by,
      image
    } = event
    let { address } = event

    const { lat, lng } = address
    const existingAddresses = await db.query(addressIdByLocQ, [lat, lng])

    if (existingAddresses.rowCount !== 0) {
      address = existingAddresses.rows[0].address_id
    } else {
      const { street, number, postal_code, city, country } = address
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
    }

    const createEvent = await db.query(createEventQ, [
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
    ])
    const newEvent: Event = createEvent.rows[0]
    return newEvent
  } catch (error) {
    return error
  }
}

const findAllEvents = async (
  category: string | undefined,
  lat: string | undefined,
  lng: string | undefined,
  distance: string | undefined
) => {
  try {
    let categoryCondition = ''
    let locationQuery = ''
    let distanceJoinQuery = ''
    if (category) {
      categoryCondition = `WHERE category = (SELECT category_id FROM category WHERE name = '${category}')`
    }

    if (lat && lng && distance) {
      const latQuery = parseFloat(lat)
      const lngQuery = parseFloat(lng)
      const distanceQuery = parseInt(distance)
      locationQuery = `
      WITH tmp as
      (SELECT * FROM
      (SELECT
          *, (
            3959 * acos (
            cos ( radians(${latQuery}) )
            * cos( radians( lat ) )
            * cos( radians( lng ) - radians(${lngQuery}) )
            + sin ( radians(${latQuery}) )
            * sin( radians( lat ) )
          )
      ) AS distance
      FROM address) al
      WHERE distance < ${distanceQuery} * 0.621371
      ORDER BY distance)
      `
      distanceJoinQuery = `INNER JOIN tmp ON tmp.address_id = event.address`
    }

    const query = `
      ${locationQuery}
      SELECT 
  	    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
        address.street, address.number, address.postal_code, address.city, address.country, address.lat, address.lng,
	      name as category, 
	      first_name, last_name
      FROM event
      ${distanceJoinQuery}
      LEFT JOIN address on event.address = address.address_id
      LEFT JOIN category on event.category = category.category_id
      LEFT JOIN userk on event.created_by = userk.user_id
      LEFT JOIN event_participant on event.event_id = event_participant.event
      ${categoryCondition}
    `
    const DBResponse = await db.query(query)
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
    const findEvent = await db.query(findRawEventByIdQ, [eventId])
    const event: Event = findEvent.rows[0]

    if (!event) {
      throw { error: 'Event not found' }
    }

    let { address } = event
    const {
      category = event.category,
      title = event.title,
      time = event.time,
      date = event.date,
      expires_at = event.expires_at,
      max_participants = event.max_participants,
      description = event.description,
      image = event.image
    } = update

    if (!update.address) {
      address = findEvent.rows[0].address
    } else {
      const { street, number, postal_code, city, country, lat, lng } = update.address
      const findExistingAddress = await db.query(addressIdByLocQ, [lat, lng])
      if (findExistingAddress.rowCount === 0) {
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
      }
    }

    const updateEvent = await db.query(updateEventQ, [
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
    const updatedEvent: Event = updateEvent.rows[0]
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
