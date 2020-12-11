import { Pool } from 'pg'

import { PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT } from '../util/secrets'
import { Event } from '../types'

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  password: PG_PW,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

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

  const DBResponse = await pool.query(
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

  const newEvent = await pool.query(
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
  return newEvent.rows[0]
}

const findAllEvents = async () => {
  try {
    const events = await (await pool.query('SELECT * FROM event')).rows
    return events
  } catch (error) {
    return error
  }
}

const findEventById = async (eventId: string) => {
  try {
    const event = await (
      await pool.query('SELECT * FROM event WHERE event_id = $1', [eventId])
    ).rows
    return event
  } catch (error) {
    return error
  }
}

const findEventByCategory = async (categoryId: number) => {
  try {
    const events = await (
      await pool.query('SELECT * FROM event WHERE category = $1', [categoryId])
    ).rows
    return events
  } catch (error) {
    return error
  }
}

const updateEvent = async (eventId: string, update: Partial<Event>) => {
  try {
    const event: Event = await (
      await pool.query('SELECT * FROM event WHERE event_id = $1', [eventId])
    ).rows[0]
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

    const updatedEvent: Event[] = await (
      await pool.query(
        'UPDATE event SET title = $2, date = $3, time = $4, description = $5, max_participants=$6, expires_at=$7, image=$8 WHERE event_id = $1 RETURNING *',
        [
          eventId,
          title,
          date,
          time,
          description,
          max_participants,
          expires_at,
          image
        ]
      )
    ).rows

    return updatedEvent
  } catch (error) {
    return error
  }
}

const deleteEvent = async (eventId: string) => {
  const event = await (
    await pool.query('SELECT * FROM event WHERE event_id = $1', [eventId])
  ).rows
  if (event.length === 0) {
    return { error: 'Event not found' }
  } else {
    await pool.query(
      'DELETE FROM event WHERE event_id = $1;',
      [eventId],
      (err) => {
        if (err) throw err
      }
    )
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
