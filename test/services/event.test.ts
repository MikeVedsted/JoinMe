import { v4 as uuidv4 } from 'uuid'

import EventService from '../../src/services/event'
import db from '../../src/db/index'
import * as dbHelper from '../db/db-helper'

type Event = {
  title: string
  category: number
  date: string
  time: string
  description: string
  max_participants: number
  address: string
  expires_at: Date
  created_at: Date
  image: string
  created_by: string
}
const nonExistingEventId = '40e6215d-b5c6-4896-987c-f30636700000'

async function createEvent(override?: Partial<Event>) {
  let event: Partial<Event> = {
    title: 'My test event',
    category: 1,
    date: '12-12-2020',
    time: '12:30',
    description: 'My custom event',
    max_participants: 20,
    address: '40e6215d-b5c6-4896-987c-f30636799999',
    expires_at: new Date('2021-06-11'),
    created_at: new Date('2020-06-11'),
    created_by: '40e6215d-b5c6-4896-987c-f30636711111',
    image: ''
  }
  if (override) {
    event = { ...event, ...override }
  }
  await db.query(
    'INSERT INTO event (event_id, title, category, date, time, description, max_participants, address, expires_at, created_at, created_by, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);',
    [
      uuidv4(),
      event.title,
      event.category,
      event.date,
      event.time,
      event.description,
      event.max_participants,
      event.address,
      event.expires_at,
      event.created_at,
      event.created_by,
      event.image
    ]
  )

  return await db.query('SELECT * FROM event;')
}

describe('event service', () => {
  beforeEach(async () => {
    await dbHelper.createTempTables()
  })

  afterEach(async () => {
    await dbHelper.dropTempTables()
  })

  afterAll(async () => {
    console.log('Keep fighting!')
  })

  it('should create a new event', async () => {
    await createEvent()
    const event = await db.query('SELECT * FROM event;')
    expect(event.rows.length).toEqual(1)
    expect(event.rows[0]).toHaveProperty('event_id')
    expect(event.rows[0]).toHaveProperty('title', 'My test event')
    expect(event.rows[0]).toHaveProperty('expires_at')
    expect(event.rows[0]).toHaveProperty('created_by', '40e6215d-b5c6-4896-987c-f30636711111')
    expect(event.rows[0]).toHaveProperty('created_at')
  })

  it('should create an event with event_id', async () => {
    const event = await createEvent()
    const found = await EventService.findEventById(event.rows[0].event_id)
    expect(found.event_id).toEqual(event.rows[0].event_id)
    expect(found.title).toEqual(event.rows[0].title)
  })

  it('should get all events', async () => {
    const event1 = await createEvent({ title: 'My test event 1' })
    const event2 = await createEvent({ title: 'My test event 2' })
    const findAllEvents = await db.query('SELECT * FROM event;')
    // Pay attention to row[number] where number is your needed row
    expect(findAllEvents.rows.length).toEqual(2)
    expect(event1.rows[0].title).toEqual('My test event 1')
    expect(event2.rows[1].title).toEqual('My test event 2')
  })

  it('should not get a non-existing event', async () => {
    const event = await createEvent()
    const found = await EventService.findEventById(nonExistingEventId)
    // FIX will be nice to handle it in services, so will be message there is no event with this id or similar
    expect(event.rows.length).toEqual(1)
    expect(found).toEqual(undefined)
  })

  it('should update an existing event', async () => {
    const event = await createEvent()
    const update: any = {
      title: 'New updated event',
      date: '2020-12-12',
      time: '13:00',
      description: 'New updated description',
      max_participants: 15,
      expires_at: new Date('2021-06-11'),
      image: 'www.photo.com'
    }
    const updated = await EventService.updateEvent(event.rows[0].event_id, update)
    expect(updated).toHaveProperty('event_id', event.rows[0].event_id)
    expect(updated).toHaveProperty('title', 'New updated event')
    expect(updated).toHaveProperty('description', 'New updated description')
  })

  it('should not update non existing event', async () => {
    const event = await createEvent()
    const update: any = {
      title: 'New updated event',
      date: '2020-12-12',
      time: '13:00',
      description: 'New updated description',
      max_participants: 15,
      expires_at: new Date('2021-06-11'),
      image: 'www.photo.com'
    }
    const updated = await EventService.updateEvent(nonExistingEventId, update)
    expect(event.rows.length).toEqual(1)
    expect(updated.error).toEqual('Event not found')
  })

  it('should delete existing event', async () => {
    const event = await createEvent()
    const deleted = await EventService.deleteEvent(event.rows[0].event_id)
    console.log('----------------------', deleted)
    expect(event.rows.length).toEqual(1)
    expect(deleted.message).toEqual('Event Successfully deleted!')
  })
})
