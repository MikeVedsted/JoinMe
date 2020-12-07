import { Request, Response, NextFunction } from 'express'

import UserService from '../services/user'
import { NotFoundError } from '../helpers/apiError'

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await UserService.findAllUsers())
  } catch (error) {
    console.log(error)
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    return res.json(await UserService.findUserById(userId))
  } catch (error) {
    console.log(error)
  }
}

export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail } = req.params
    return res.json(await UserService.findUserByEmail(userEmail))
  } catch (error) {
    console.log(error)
  }
}

export const googleCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('something should happen when this is called. Req: ', req)
  } catch (error) {
    console.log(error)
  }
}

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_token } = req.body
    return res.json(await UserService.googleLogin(id_token, res))
  } catch (error) {
    next(new NotFoundError('Unexpected error', error))
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const { update } = req.body

    return res.json(await UserService.updateUser(userId, update))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params
  try {
    res.json(await UserService.deleteUser(userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}
