import UserService from '../../src/services/user'
import db from '../../src/db/index'
import * as dbHelper from '../db/db-helper'
import { User } from '../../src/types'

const nonExistingUserId = '40e6215d-b5c6-4896-987c-f30636700000'

async function createUser() {
  await db.query(
    'INSERT INTO userk (user_id, first_name, last_name, email, created_at) VALUES ($1, $2, $3, $4, $5);',
    [
      '40e6215d-b5c6-4896-987c-f3063678f608',
      'Tester22',
      'Testerov',
      'testherethestthere@test.com',
      '2017-03-18 08:21:36.175627+07'
    ]
  )
  return await db.query('SELECT * FROM userk;')
}

describe('user controller', () => {
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
    await db.query(
      'INSERT INTO userk (user_id, first_name, last_name, email, created_at) VALUES ($1, $2, $3, $4, $5);',
      [
        '40e6215d-b5c6-4896-987c-f3063678f608',
        'Tester22',
        'Testerov',
        'testherethestthere@test.com',
        '2017-03-18 08:21:36.175627+07'
      ]
    )
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
    const found = await UserService.findUserById('40e6215d-b5c6-4896-987c-f3063678f608')

    expect(found.user_id).toEqual(user.rows[0].user_id)
    expect(found.email).toEqual(user.rows[0].email)
  })

  it('should get all users', async () => {
    const user1 = await createUser()
    const user2 = await db.query(
      'INSERT INTO userk (user_id, first_name, last_name, email, created_at) VALUES ($1, $2, $3, $4, $5);',
      [
        '40e6215d-b5c6-4896-987c-f3063678f508',
        'Tester1',
        'Testerov1',
        'testherethestthereheh@test.com',
        '2017-05-18 08:21:36.175627+07'
      ]
    )
    const findAllUsers = await db.query('SELECT * FROM userk;')

    expect(findAllUsers.rows.length).toEqual(2)
  })

  it('should not get a non-existing event', async () => {
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
    const deleted = await UserService.deleteUser('40e6215d-b5c6-4896-987c-f3063678f608')

    expect(user.rows.length).toEqual(1)
    expect(deleted.message).toEqual('User deleted')
  })
})
