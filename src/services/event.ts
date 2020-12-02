import { Response, Request } from 'express'
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
    image
  } = event
  const newEvent = await pool.query(
    'INSERT INTO event (title, category, date, time, description, max_participants, address, expires_at, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      title,
      category,
      date,
      time,
      description,
      max_participants,
      address,
      expires_at,
      image
    ]
  )
  return newEvent.rows
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

const updateEvent = async (eventId: string, update: string) => {
  console.log(
    'Update event fired for id: ',
    eventId,
    'update(should be changed from string): ',
    update
  )
}

const deleteEvent = async(req:Request, res:Response) => {
  const eventId = req.params.eventId
  const event = await (await pool.query('SELECT * from event WHERE event_id=$1', [eventId])).rows
  if (event.length === 0) {
    return res.status(404).json({Error:'Event not found'})
  } else {
    await pool.query('DELETE FROM event WHERE event_id=$1', [eventId], (err) => {
      if(err) throw err
    })
    return res.status(204).end()
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
