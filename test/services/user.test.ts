import { v4 as uuidv4 } from 'uuid'

import UserService from '../../src/services/user'
import db from '../../src/db/index'
import * as dbHelper from '../db/db-helper'
import { User } from '../../src/types'

const nonExistingUserId = '40e6215d-b5c6-4896-987c-f30636700000'

async function createUser(override?: Partial<User>) {
  let user: Partial<User> = {
    first_name: 'Tester22',
    last_name: 'Testerov',
    email: 'testherethestthere@test.com'
  }
  if (override) {
    user = { ...user, ...override }
  }
  await db.query(
    'INSERT INTO userk (user_id, first_name, last_name, email, created_at) VALUES ($1, $2, $3, $4, $5);',
    [uuidv4(), user.first_name, user.last_name, user.email, '2017-03-18 08:21:36.175627+07']
  )

  return await db.query('SELECT * FROM userk;')
}

describe('user service', () => {
  beforeEach(async () => {
    await dbHelper.createTempTables()
  })

  afterEach(async () => {
    await dbHelper.dropTempTables()
  })

  afterAll(async () => {
    console.log('Keep fighting!')
  })

  it('should create a new user', async () => {
    await createUser()
    const user = await db.query('SELECT * FROM userk;')

    expect(user.rows.length).toEqual(1)
    expect(user.rows[0]).toHaveProperty('user_id')
    expect(user.rows[0]).toHaveProperty('first_name', 'Tester22')
    expect(user.rows[0]).toHaveProperty('last_name', 'Testerov')
    expect(user.rows[0]).toHaveProperty('email', 'testherethestthere@test.com')
    expect(user.rows[0]).toHaveProperty('created_at')
  })

  it('should create a user with user_id', async () => {
    const user = await createUser()
    const found = await UserService.findUserById(user.rows[0].user_id)

    expect(found.user_id).toEqual(user.rows[0].user_id)
    expect(found.email).toEqual(user.rows[0].email)
  })

  it('should get all users', async () => {
    const user1 = await createUser({ first_name: 'Rost' })
    const user2 = await createUser({ email: 'Petrenko@dff.com' })
    const findAllUsers = await db.query('SELECT * FROM userk;')

    // Pay attention to row[number] where number is your needed row
    expect(findAllUsers.rows.length).toEqual(2)
    expect(user1.rows[0].first_name).toEqual('Rost')
    expect(user2.rows[1].email).toEqual('Petrenko@dff.com')
  })

  it('should not get a non-existing user', async () => {
    const user = await createUser()
    const found = await UserService.findUserById(nonExistingUserId)

    // FIX will be nice to handle it in services, so will be message there is no user with this id or similar
    expect(user.rows.length).toEqual(1)
    expect(found).toEqual(undefined)
  })

  it('should update an existing user', async () => {
    const user = await createUser()
    const update: Partial<User> = {
      first_name: 'Kesha',
      last_name: 'Stepanov'
    }
    const updated = await UserService.updateUser(user.rows[0].user_id, update)

    expect(updated).toHaveProperty('user_id', user.rows[0].user_id)
    expect(updated).toHaveProperty('first_name', 'Kesha')
    expect(updated).toHaveProperty('last_name', 'Stepanov')
  })

  it('should not update non existing user', async () => {
    const user = await createUser()
    const update: Partial<User> = {
      first_name: 'Kesha',
      last_name: 'Stepanov'
    }
    const updated = await UserService.updateUser(nonExistingUserId, update)

    expect(user.rows.length).toEqual(1)
    expect(updated).toBeInstanceOf(Error)
  })

  it('should delete existing user', async () => {
    const user = await createUser()
    const deleted = await UserService.deleteUser(user.rows[0].user_id)

    expect(user.rows.length).toEqual(1)
    expect(deleted.message).toEqual('User deleted')
  })
})
