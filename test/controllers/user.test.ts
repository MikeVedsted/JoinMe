import request from 'supertest'

import app from '../../src/app'

describe('user controller', () => {
  beforeEach(async () => {
    //await dbHelper.connect()
  })

  afterEach(async () => {
    //await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    //await dbHelper.closeDatabase()
  })

  it('should get all users', async () => {
    const res = await request(app).get('/api/v1/users/').send()
    console.log(res.text)
    expect(res.status).toBe(200)
  })
})
