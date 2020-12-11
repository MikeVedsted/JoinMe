import request from 'supertest'

import app from '../../src/app'
import db from '../../src/db/index'
import * as dbHelper from '../db/db-helper'

describe('user controller', () => {
  beforeEach(async () => {
    // console.log(await (await db.query('SELECT * FROM userk;')).rows)
    await dbHelper.createTempTables()
  })

  afterEach(async () => {
    await dbHelper.dropTempTables()
  })

  afterAll(async () => {
    // console.log(await (await db.query('SELECT * FROM userk;')).rows)
  })

  it('should get all users', async () => {
    await db.query(
      'INSERT INTO userk (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4);',
      [
        '40e6215d-b5c6-4896-987c-f3063678f608',
        'Tester22',
        'Testerov',
        'testherethestthere@test.com'
      ]
    )
    const res = await request(app).get('/api/v1/users').send()
    expect(res.body.length).toEqual(1)
  })
})
