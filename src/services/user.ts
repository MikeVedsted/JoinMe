import { Response } from 'express'
import jwt from 'jsonwebtoken'

import generateToken from '../helpers/generateToken'
import { GoogleToken, User } from '../types'
import db from '../db'

const googleLogin = async (id_token: string, res: Response) => {
  const decodedToken = jwt.decode(id_token)
  const { given_name, family_name, picture, email } = decodedToken as GoogleToken
  try {
    const DBResponse = await db.query('SELECT * FROM userk WHERE email = $1', [email])
    const user: User = DBResponse.rows[0]

    if (!user) {
      const createUser = await db.query(
        'INSERT INTO userk (profile_image, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [picture, given_name, family_name, email]
      )
      const newUser: User = createUser.rows[0]
      const token = generateToken(newUser.user_id)
      res.cookie('x-auth-token', token)
      return newUser
    } else {
      const token = generateToken(user.user_id)
      res.cookie('x-auth-token', token)
      return user
    }
  } catch (error) {
    return error
  }
}

const findUserById = async (userId: string) => {
  try {
    const query = `
    SELECT u.*, a.*, array_agg(c.name) as interests
    FROM userk u
    LEFT JOIN user_interest ui ON u.user_id = ui.userk
    LEFT JOIN category c ON c.category_id = ui.interest
    LEFT JOIN address a ON u.base_address = a.address_id
    WHERE u.user_id = $1
    GROUP BY u.user_id, a.address_id;
    `
    const DBResponse = await db.query(query, [userId])
    const user: User = DBResponse.rows[0]
    return user
  } catch (error) {
    return error
  }
}

const findAllUsers = async () => {
  try {
    const DBResponse = await db.query('SELECT * FROM userk')
    const users: User[] = DBResponse.rows
    return users
  } catch (error) {
    return error
  }
}

const updateUser = async (userId: string, update: Partial<User>) => {
  try {
    const userResponse = await db.query('SELECT * FROM userk WHERE user_id = $1', [userId])
    const user: User = userResponse.rows[0]

    if (!user) {
      throw new Error()
    }

    const {
      first_name = user.first_name,
      last_name = user.last_name,
      profile_image = user.profile_image,
      profile_text = user.profile_text,
      address = {
        street: '',
        number: 0,
        postal_code: 12345,
        city: '',
        country: '',
        lat: 0,
        lng: 0
      },
      date_of_birth = user.date_of_birth,
      gender = user.gender
    } = update

    const { street, postal_code, city, country, lat, lng } = address
    let { number } = address
    !number && (number = 0)
    let addressId: string

    const addressResponse = await db.query(
      'SELECT address_id FROM address WHERE lat = $1 and lng = $2',
      [lat, lng]
    )

    if (addressResponse.rowCount === 0) {
      const newAddress = await db.query(
        'INSERT INTO address (street, number, postal_code, city, country, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING address_id',
        [street, number, postal_code, city, country, lat, lng]
      )
      addressId = newAddress.rows[0].address_id
    } else {
      addressId = addressResponse.rows[0].address_id
    }

    const updateUser = await db.query(
      'UPDATE userk SET first_name = $2, last_name = $3, profile_image = $4, profile_text = $5, base_address = $6, date_of_birth = $7, gender = $8 WHERE user_id = $1 RETURNING *',
      [userId, first_name, last_name, profile_image, profile_text, addressId, date_of_birth, gender]
    )
    const updatedUser: User = updateUser.rows[0]
    return updatedUser
  } catch (error) {
    return error
  }
}

const deleteUser = async (userId: string) => {
  const DBResponse = await db.query('SELECT * FROM userk WHERE user_id = $1', [userId])
  const user: User = DBResponse.rows[0]

  if (!user) {
    throw new Error()
  } else {
    await db.query('DELETE FROM userk WHERE user_id = $1;', [userId])
    return { message: 'User deleted' }
  }
}

const getUserCount = async () => {
  try {
    const DBResponse = await db.query('SELECT * FROM userk')
    const count: number = DBResponse.rows.length
    return count
  } catch (error) {
    return error
  }
}

const getInterestedEvents = async (user_id: string) => {
  try {
    const query = `
      SELECT 
        event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
        street, number, postal_code, city, country, lat, lng,
        name as category,
        first_name, last_name  
      FROM event
      INNER JOIN event_request ON event.event_id = event_request.event
      INNER JOIN address ON address.address_id = event.address
      INNER JOIN category ON category.category_id = event.category
      INNER JOIN userk ON event_request.requester = userk.user_id
      WHERE event_request.requester = $1;
    `
    const DBResponse = await db.query(query, [user_id])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findParticipatingEvents = async (user_id: string) => {
  try {
    const query = `
      SELECT 
        event_id, title, date, time, description, max_participants, created_by, event.created_at, expires_at, image,
        street, number, postal_code, city, country, lat, lng,
        name as category,
        first_name, last_name  
      FROM event
      INNER JOIN event_participant ON event.event_id = event_participant.event
      INNER JOIN address ON address.address_id = event.address
      INNER JOIN category ON category.category_id = event.category
      INNER JOIN userk ON event_participant.participant = userk.user_id
      WHERE event_participant.participant = $1;
    `
    const DBResponse = await db.query(query, [user_id])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

export default {
  findUserById,
  findAllUsers,
  updateUser,
  googleLogin,
  deleteUser,
  getUserCount,
  getInterestedEvents,
  findParticipatingEvents
}
