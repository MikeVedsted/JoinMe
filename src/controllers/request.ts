import { Response, NextFunction } from 'express'

import { BadRequestError, NotFoundError } from '../helpers/apiError'
import RequestService from '../services/request'
import { AuthRequest } from '../types'

export const cancelRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { requestId } = req.params
    const { user_id } = req.user
    res.json(await RequestService.cancelRequest(requestId, user_id))
  } catch (error) {
    next(new BadRequestError('Request not found', error))
  }
}

export const cancelParticipation = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { participantId } = req.params
    const { user_id } = req.user
    res.json(await RequestService.cancelParticipation(participantId, user_id))
  } catch (error) {
    next(new BadRequestError('Please check your submission', error))
  }
}

export const findEventRequests = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }

    const { user_id } = req.user
    const { eventId } = req.params
    res.json(await RequestService.findEventRequests(eventId, user_id))
  } catch (error) {
    next(new NotFoundError('No requests found', error))
  }
}

export const acceptRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }

    const { requestId } = req.params
    const { user_id } = req.user
    res.json(await RequestService.acceptRequest(requestId, user_id))
  } catch (error) {
    next(new NotFoundError('Request not found', error))
  }
}

export const rejectRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }

    const { requestId } = req.params
    const { user_id } = req.user
    res.json(await RequestService.rejectRequest(requestId, user_id))
  } catch (error) {
    next(new NotFoundError('Request not found', error))
  }
}

export const removeParticipant = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { participantId } = req.params
    const { user_id } = req.user
    res.json(await RequestService.removeParticipant(participantId, user_id))
  } catch (error) {
    next(new NotFoundError('Request not found', error))
  }
}
