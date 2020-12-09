import { Response } from 'express'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'

import generateToken from '../helpers/generateToken'
import { PG_USER, PG_HOST, PG_DB, PG_PW, PG_PORT } from '../util/secrets'
import { GoogleToken, User } from '../types'
import db from '../db/index'

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

const googleLogin = async (id_token: string, res: Response) => {
  const decodedToken = jwt.decode(id_token)
  const { given_name, family_name, picture, email } = decodedToken as GoogleToken
  try {
    const DBResponse = await pool.query('SELECT * FROM userk WHERE email = $1', [email])
    const user: User = DBResponse.rows[0]

    if (!user) {
      const createUser = await pool.query(
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
    const DBResponse = await pool.query('SELECT * FROM userk WHERE user_id = $1', [userId])
    const user: User = DBResponse.rows[0]
    return user
  } catch (error) {
    return error
  }
}

const findAllUsers = async () => {
  try {
    const DBResponse = await pool.query('SELECT * FROM userk')
    const users: User[] = DBResponse.rows
    return users
  } catch (error) {
    return error
  }
}

const updateUser = async (userId: string, update: Partial<User>) => {
  try {
    const DBResponse = await pool.query('SELECT * FROM userk WHERE user_id = $1', [userId])
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

    const updateUser = await pool.query(
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
  const DBResponse = await pool.query('SELECT * FROM userk WHERE user_id = $1', [userId])
  const user: User = DBResponse.rows[0]

  if (!user) {
    throw new Error()
  } else {
    pool.query('DELETE FROM userk WHERE user_id = $1;', [userId], (err) => {
      if (err) throw err
    })
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
