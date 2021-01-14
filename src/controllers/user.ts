import { Request, Response, NextFunction } from 'express'

import UserService from '../services/user'
import { NotFoundError, BadRequestError } from '../helpers/apiError'

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_token } = req.body
    return res.json(await UserService.googleLogin(id_token, res))
  } catch (error) {
    next(new BadRequestError('Unexpected error', error))
  }
}

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await UserService.findAllUsers())
  } catch (error) {
    next(new NotFoundError('No users found', error))
  }
}

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    return res.json(await UserService.findUserById(userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    const update = req.body
    return res.json(await UserService.updateUser(userId, update))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    return res.json(await UserService.deleteUser(userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const getUserCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await UserService.getUserCount())
  } catch (error) {
    next(new NotFoundError('No users found', error))
  }
}
