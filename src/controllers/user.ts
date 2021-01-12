import { Request, Response, NextFunction } from 'express'

import UserService from '../services/user'
import { NotFoundError, BadRequestError } from '../helpers/apiError'
import { AuthRequest, User } from '../types'

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_token } = req.body
    return res.json(await UserService.googleLogin(id_token, res))
  } catch (error) {
    next(new BadRequestError('Unexpected error', error))
  }
}

export const refreshToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { user_id } = req.user
    return res.json(await UserService.refreshToken(user_id, res))
  } catch (error) {
    next(new BadRequestError('Unexpected error', error))
  }
}

export const getTokenInfo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { user_id } = req.user
    return res.json(await UserService.findUserById(user_id))
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

export const getInterestedEvents = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { user_id } = req.user
    return res.json(await UserService.getInterestedEvents(user_id))
  } catch (error) {
    next(new NotFoundError('No results found', error))
  }
}

export const findParticipatingEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { user_id } = req.user
    return res.json(await UserService.findParticipatingEvents(user_id))
  } catch (error) {
    next(new NotFoundError('No results found', error))
  }
}
