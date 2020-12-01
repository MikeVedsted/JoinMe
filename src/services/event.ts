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
  const newEvent = await pool.query(
    'INSERT INTO event (title, category, date, time, description, max_participants, address, expires_at, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      event.title,
      event.category,
      event.date,
      event.time,
      event.description,
      event.max_participants,
      event.address,
      event.expires_at,
      event.image
    ]
  )
  return newEvent.rows
}

const findEventById = async (eventId: string) => {
  console.log('find by ID fired for id: ', eventId)
}

const findAllEvents = async () => {
  const data = ( await pool.query('SELECT * FROM event')).rows
  return data
}

const updateEvent = async (eventId: string, update: string) => {
  console.log(
    'Update event fired for id: ',
    eventId,
    'update(should be changed from string): ',
    update
  )
}

const deleteEvent = (eventId: string) => {
  console.log('Delete event fired for id: ', eventId)
}

export default {
  createEvent,
  findEventById,
  findAllEvents,
  updateEvent,
  deleteEvent
}
