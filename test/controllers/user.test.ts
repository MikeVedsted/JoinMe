import request from 'supertest'
import { Pool } from 'pg'

import { PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT } from '../../src/util/secrets'
import app from '../../src/app'
import db from '../../src/db/index'

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

describe('user controller', () => {
  beforeEach(async () => {
    console.log(await (await db.query('SELECT * FROM userk;')).rows)
  })

  afterEach(async () => {
    // drg
  })

  afterAll(async () => {
    console.log(await (await db.query('SELECT * FROM userk;')).rows)
  })

  it('should get all users', async () => {
    await db.query('CREATE TEMPORARY TABLE userk ( LIKE userk );')
    await db.query(
      'INSERT INTO userk (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4);',
      [
        '40e6215d-b5c6-4896-987c-f30f3678f608',
        'Test',
        'Tester',
        'tester@gmail.com'
      ]
    )
    console.log(await (await db.query('SELECT * FROM userk;')).rows)
    const res = await request(app).get('/api/v1/users/').send()
    console.log(JSON.parse(res.text))
    expect(res.status).toBe(200)
  })
})
