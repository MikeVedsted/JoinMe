import { Response } from 'express'
import jwt from 'jsonwebtoken'

import {
  findUserByEmailQ,
  createUserQ,
  findUserByIdQ,
  findAllUsersQ,
  rawUserkByIdQ,
  addressIdByLocQ,
  createAddressQ,
  updateUserQ,
  deleteUserQ,
  findEventRequestsByUserQ,
  findEventParticipatingQ,
  findPublicUserQ
} from '../db/queries'
import db from '../db'
import { generateAccessToken, generateRefreshToken } from '../helpers/generateToken'
import { Address, GoogleToken, User } from '../types'

const googleLogin = async (id_token: string, res: Response) => {
  const decodedToken = jwt.decode(id_token)
  const { given_name, family_name, picture, email } = decodedToken as GoogleToken
  try {
    const DBResponse = await db.query(findUserByEmailQ, [email])
    const user: User = DBResponse.rows[0]

    if (!user) {
      const createUser = await db.query(createUserQ, [picture, given_name, family_name, email])
      const DBResponse = await db.query(findUserByIdQ, [createUser.rows[0].user_id])
      const newUser: User = DBResponse.rows[0]
      const accessToken = generateAccessToken(newUser.user_id)
      const refreshToken = generateRefreshToken(newUser.user_id)
      res.cookie('x-auth-access-token', accessToken)
      res.cookie('x-auth-refresh-token', refreshToken)
      return newUser
    } else {
      const accessToken = generateAccessToken(user.user_id)
      const refreshToken = generateRefreshToken(user.user_id)
      res.cookie('x-auth-access-token', accessToken)
      res.cookie('x-auth-refresh-token', refreshToken)
      return user
    }
  } catch (error) {
    return error
  }
}

const findUserById = async (userId: string) => {
  try {
    const DBResponse = await db.query(findUserByIdQ, [userId])
    if (DBResponse.rows.length === 0) {
      throw { status: 404, message: 'No found user' }
    } else {
      const user: User = DBResponse.rows[0]
      return user
    }
  } catch (error) {
    if (error.status) {
      throw error
    } else {
      throw { status: 500, message: 'Bad Request', error: error }
    }
  }
}

const findAllUsers = async () => {
  try {
    const DBResponse = await db.query(findAllUsersQ)
    const users: User[] = DBResponse.rows
    return users
  } catch (error) {
    return error
  }
}

const updateUser = async (userId: string, update: Partial<User>) => {
  try {
    const userResponse = await db.query(rawUserkByIdQ, [userId])
    const user: User = userResponse.rows[0]

    if (!user) {
      throw new Error('User not found')
    }

    const {
      first_name = user.first_name,
      last_name = user.last_name,
      profile_image = user.profile_image,
      profile_text = user.profile_text,
      date_of_birth = user.date_of_birth,
      gender = user.gender
    } = update
    const { base_address } = user
    let addressId: string | Address | undefined = base_address

    if (update.address) {
      const address: Address = update.address
      const { street, number, postal_code, city, country, lat, lng } = address

      const addressResponse = await db.query(addressIdByLocQ, [lat, lng])

      if (addressResponse.rowCount === 0) {
        const newAddress = await db.query(createAddressQ, [
          street,
          number,
          postal_code,
          city,
          country,
          lat,
          lng
        ])
        addressId = newAddress.rows[0].address_id
      } else {
        addressId = addressResponse.rows[0].address_id
      }
    }

    const updateUser = await db.query(updateUserQ, [
      userId,
      first_name,
      last_name,
      profile_image,
      profile_text,
      addressId,
      date_of_birth,
      gender
    ])
    const DBResponse = await db.query(findUserByIdQ, [updateUser.rows[0].user_id])
    const updatedUser: User = DBResponse.rows[0]
    return updatedUser
  } catch (error) {
    return error
  }
}

const deleteUser = async (userId: string) => {
  const DBResponse = await db.query(rawUserkByIdQ, [userId])
  const user: User = DBResponse.rows[0]

  if (!user) {
    throw new Error()
  }

  await db.query(deleteUserQ, [userId])
  return { message: 'User deleted' }
}

const getUserCount = async () => {
  try {
    const DBResponse = await db.query(findAllUsersQ)
    const count: number = DBResponse.rows.length
    return count
  } catch (error) {
    return error
  }
}

const getInterestedEvents = async (user_id: string) => {
  try {
    const DBResponse = await db.query(findEventRequestsByUserQ, [user_id])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findParticipatingEvents = async (user_id: string) => {
  try {
    const DBResponse = await db.query(findEventParticipatingQ, [user_id])
    const events: Event[] = DBResponse.rows
    return events
  } catch (error) {
    return error
  }
}

const findPublicUserInfo = async (userId: string) => {
  const DBResponse = await db.query(findPublicUserQ, [userId])
  if (DBResponse.rows.length > 0) {
    const publicInfo: Partial<User> = DBResponse.rows[0]
    return publicInfo
  } else {
    throw 'No found user'
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
  findParticipatingEvents,
  findPublicUserInfo
}
