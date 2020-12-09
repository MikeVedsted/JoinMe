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
      image,
      creator
    } = event
    const createEvent = await pool.query(
      'INSERT INTO event (title, category, creator, date, time, description, max_participants, address, expires_at, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        title,
        category,
        creator,
        date,
        time,
        description,
        max_participants,
        address,
        expires_at,
        image
      ]
    )
    const newEvent: Event = createEvent.rows[0]
    return newEvent
  } catch (error) {
    return error
  }
}

const findAllEvents = async () => {
  try {
    const DBResponse = await pool.query('SELECT * FROM event')
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findEventById = async (eventId: string) => {
  try {
    const DBResponse = await pool.query('SELECT * FROM event WHERE event_id = $1', [eventId])
    const event: Event = DBResponse.rows[0]
    return event
  } catch (error) {
    return error
  }
}

const findEventByCategory = async (categoryId: number) => {
  try {
    const DBResponse = await pool.query('SELECT * FROM event WHERE category = $1', [categoryId])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const updateEvent = async (eventId: string, update: Partial<Event>) => {
  try {
    const DBResponse = await pool.query('SELECT * FROM event WHERE event_id = $1', [eventId])
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

    const updateQuery = await pool.query(
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
  const DBResponse = await pool.query('SELECT * FROM event WHERE event_id = $1', [eventId])
  const eventToDelete = DBResponse.rows[0]
  if (!eventToDelete) {
    return { error: 'Event not found' }
  } else {
    pool.query('DELETE FROM event WHERE event_id = $1;', [eventId], (err) => {
      if (err) throw err
    })
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
