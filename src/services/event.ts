import { Event } from '../types'
import db from '../db'
import { parse } from 'dotenv/types'

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

    const DBResponse = await db.query(
      'SELECT address_id FROM address WHERE lat = $1 and lng = $2',
      [lat, lng]
    )

    if (DBResponse.rowCount === 0) {
      const newAddressQuery = `
      INSERT INTO address 
        (street, number, postal_code, city, country, lat, lng)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING address_id
    `
      const newAddress = await db.query(newAddressQuery, [
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

    const createEventQuery = `
    INSERT INTO event 
      (title, category, date, time, description, max_participants, address, expires_at, created_by, image) 
    VALUES ($1, (SELECT category_id FROM category WHERE name = $2), $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *'
  `
    const createEvent = await db.query(createEventQuery, [
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
      const distanceQuery = parseFloat(distance)
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
    const query = `
      SELECT 
  	    event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
 	      street, number, postal_code, city, country, lat, lng,
	      name as category, 
	      first_name,  last_name
      FROM
        event
      LEFT JOIN address on event.address = address.address_id
      LEFT JOIN category on event.category = category.category_id
      LEFT JOIN userk on event.created_by = userk.user_id
      LEFT JOIN event_participant on event.event_id = event_participant.event
    `
    const DBResponse = await db.query(`${query} WHERE event_id = $1`, [eventId])
    const event: Event = DBResponse.rows[0]

    return event
  } catch (error) {
    return error
  }
}

const findEventsByCreator = async (userId: string) => {
  try {
    const query = `
      SELECT 
         event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
         street, number, postal_code, city, country, lat, lng,
         name as category,
        first_name, last_name  
      FROM event 
      INNER JOIN address ON address.address_id = event.address
      INNER JOIN category ON category.category_id = event.category
      INNER JOIN userk ON userk.user_id = event.created_by
      WHERE created_by = $1;
    `
    const DBResponse = await db.query(query, [userId])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findEventByCategory = async (categoryId: number) => {
  try {
    const DBResponse = await db.query('SELECT * FROM event WHERE category = $1', [categoryId])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const updateEvent = async (eventId: string, update: Partial<Event>) => {
  try {
    const DBResponse = await db.query('SELECT * FROM event WHERE event_id = $1', [eventId])
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
      const DBAddressResponse = await db.query(
        'SELECT address_id FROM address WHERE lat = $1 and lng = $2',
        [lat, lng]
      )
      if (DBAddressResponse.rowCount === 0) {
        const newAddress = await db.query(
          'INSERT INTO address (street, number, postal_code, city, country, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING address_id',
          [street, number, postal_code, city, country, lat, lng]
        )
        address = newAddress.rows[0].address_id
      } else {
        address = DBResponse.rows[0].address
      }
    }

    const updateQuery = await db.query(
      'UPDATE event SET title = $2, date = $3, time = $4, description = $5, max_participants=$6, expires_at=$7, image=$8, category=(SELECT category_id FROM category WHERE name = $9), address=$10 WHERE event_id = $1 RETURNING *',
      [
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
      ]
    )
    const updatedEvent: Event = updateQuery.rows[0]
    return updatedEvent
  } catch (error) {
    return error
  }
}

const deleteEvent = async (eventId: string) => {
  const DBResponse = await db.query('SELECT * FROM event WHERE event_id = $1', [eventId])
  const eventToDelete = DBResponse.rows[0]
  if (!eventToDelete) {
    return { error: 'Event not found' }
  } else {
    db.query('DELETE FROM event WHERE event_id = $1;', [eventId])
    return { message: 'Event Successfully deleted!' }
  }
}

const requestToJoin = async (eventId: string, userId: string) => {
  const checkStatusQuery = 'SELECT * FROM event_request WHERE event = $1 AND requester = $2'
  const newRequestQuery = 'INSERT INTO event_request (requester, event) VALUES($2, $1) RETURNING *'

  const checkIfRequested = await db.query(checkStatusQuery, [eventId, userId])

  if (checkIfRequested.rows.length > 0) {
    return { message: 'Already requested' }
  }

  const newRequest = await db.query(newRequestQuery, [eventId, userId])
  const request = newRequest.rows[0]
  return { message: 'Successfully requested', request }
}

export default {
  createEvent,
  findEventById,
  findEventsByCreator,
  findAllEvents,
  findEventByCategory,
  updateEvent,
  deleteEvent,
  requestToJoin
}
