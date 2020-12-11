import { Request, Response, NextFunction } from 'express'

import { NotFoundError, BadRequestError } from '../helpers/apiError'
import EventService from '../services/event'
import { Event } from '../types'

export const findAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await EventService.findAllEvents())
  } catch (error) {
    next(new NotFoundError('No events found', error))
  }
}

export const findEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params
  try {
    res.json(await EventService.findEventById(eventId))
  } catch (error) {
    next(new NotFoundError('No event found', error))
  }
}

export const findEventByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = parseInt(req.params.categoryId)
  try {
    res.json(await EventService.findEventByCategory(categoryId))
  } catch (error) {
    next(new NotFoundError('No events found', error))
  }
}

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TO DO
    // Add validation
    const {
      title,
      category,
      date,
      time,
      description,
      maxParticipants,
      created_by,
      image,
      expires_at,
      address
    } = req.body
    const max_participants = parseInt(maxParticipants)
    // TO DO
    // Add user as created_by, once middleware is applied.

    const event: Event = {
      title,
      category,
      date,
      time,
      description,
      max_participants,
      address,
      expires_at,
      created_by,
      image
    }

    res.json(await EventService.createEvent(event))
  } catch (error) {
    next(new BadRequestError('Failed to create event', error))
  }
}

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params
    const update = req.body
    return res.json(await EventService.updateEvent(eventId, update))
  } catch (error) {
    next(new NotFoundError('Event not found', error))
  }
}

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params
  try {
    res.json(await EventService.deleteEvent(eventId))
  } catch (error) {
    next(new NotFoundError('Event not found', error))
  }
}
