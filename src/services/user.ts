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
    INNER JOIN user_interest ui ON u.user_id = ui.userk
    INNER JOIN category c ON c.category_id = ui.interest
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
    const DBResponse = await db.query('SELECT * FROM userk WHERE user_id = $1', [userId])
    const user: User = DBResponse.rows[0]

    if (!user) {
      throw new Error()
    }

    const {
      first_name = user.first_name,
      last_name = user.last_name,
      profile_image = user.profile_image,
      profile_text = user.profile_text
    } = update

    const updateUser = await db.query(
      'UPDATE userk SET first_name = $2, last_name = $3, profile_image = $4, profile_text = $5 WHERE user_id = $1 RETURNING *',
      [userId, first_name, last_name, profile_image, profile_text]
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

export default {
  findUserById,
  findAllUsers,
  updateUser,
  googleLogin,
  deleteUser
}
