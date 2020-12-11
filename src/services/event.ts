import { Event } from '../types'
import db from '../db'

const createEvent = async (event: Event) => {
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
  !number ? (number = 0) : null
  let addressId: string

  const DBResponse = await db.query(
    'SELECT address_id FROM address WHERE lat = $1 and lng = $2',
    [lat, lng]
  )

  if (DBResponse.rowCount === 0) {
    const newAddress = await pool.query(
      'INSERT INTO address (street, number, postal_code, city, country, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING address_id',
      [street, number, postal_code, city, country, lat, lng]
    )
    addressId = newAddress.rows[0].address_id
  } else {
    addressId = DBResponse.rows[0].address_id
  }

  const createEvent = await db.query(
    'INSERT INTO event (title, category, date, time, description, max_participants, address, expires_at, created_by, image) VALUES ($1, (SELECT category_id FROM category WHERE name = $2), $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
    [
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
    ]
  )
   const newEvent: Event = createEvent.rows[0]
   return newEvent
}

const findAllEvents = async () => {
  try {
    const DBResponse = await db.query('SELECT * FROM event')
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findEventById = async (eventId: string) => {
  try {
    const DBResponse = await db.query('SELECT * FROM event WHERE event_id = $1', [eventId])
    const event: Event = DBResponse.rows[0]

    return event
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

    const {
      title = event.title,
      date = event.date,
      time = event.time,
      description = event.description,
      max_participants = event.max_participants,
      expires_at = event.expires_at,
      image = event.image
    } = update

    const updateQuery = await db.query(
      'UPDATE event SET title = $2, date = $3, time = $4, description = $5, max_participants=$6, expires_at=$7, image=$8 WHERE event_id = $1 RETURNING *',
      [eventId, title, date, time, description, max_participants, expires_at, image]
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

export default {
  createEvent,
  findEventById,
  findAllEvents,
  findEventByCategory,
  updateEvent,
  deleteEvent
}
