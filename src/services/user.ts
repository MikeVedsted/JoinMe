import { Response } from 'express'
import jwt from 'jsonwebtoken'

import generateToken from '../helpers/generateToken'
import db from '../db'
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
  findEventParticipatingQ
} from '../db/queries'
import { GoogleToken, User } from '../types'

const googleLogin = async (id_token: string, res: Response) => {
  const decodedToken = jwt.decode(id_token)
  const { given_name, family_name, picture, email } = decodedToken as GoogleToken
  try {
    const findUser = await db.query(findUserByEmailQ, [email])
    const user: User = findUser.rows[0]

    if (!user) {
      const createUser = await db.query(createUserQ, [picture, given_name, family_name, email])
      const newUser: User = createUser.rows[0]
      const token = generateToken(newUser.user_id)
      res.cookie('x-auth-token', token)
      return newUser
    }

    const token = generateToken(user.user_id)
    res.cookie('x-auth-token', token)
    return user
  } catch (error) {
    return error
  }
}

const findUserById = async (userId: string) => {
  try {
    const DBResponse = await db.query(findUserByIdQ, [userId])
    const user: User = DBResponse.rows[0]
    return user
  } catch (error) {
    return error
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
    }

    addressId = addressResponse.rows[0].address_id

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
    const updatedUser: User = updateUser.rows[0]
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
