import { Request, Response, NextFunction } from 'express'

import { NotFoundError, BadRequestError } from '../helpers/apiError'
import EventService from '../services/event'
import { AuthRequest, Event, EventSearchQuery } from '../types'

export const findAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, lat, lng, distance } = req.query as EventSearchQuery
    res.json({
      events: await EventService.findAllEvents(category, lat, lng, distance)
    })
  } catch (error) {
    next(new NotFoundError('No events found', error))
  }
}

export const findEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params
    res.json(await EventService.findEventById(eventId))
  } catch (error) {
    next(new NotFoundError('No event found', error))
  }
}

export const findEventsByCreator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    res.json(await EventService.findEventsByCreator(userId))
  } catch (error) {
    next(new NotFoundError('No events found', error))
  }
}

export const createEvent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const {
      title,
      category,
      date,
      time,
      description,
      max_participants,
      image,
      expires_at,
      address
    } = req.body
    const created_by = req.user?.user_id

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

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params
    const update = req.body

    return res.json(await EventService.updateEvent(eventId, update))
  } catch (error) {
    next(new NotFoundError('Event not found', error))
  }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params
    res.json(await EventService.deleteEvent(eventId))
  } catch (error) {
    next(new NotFoundError('Event not found', error))
  }
}

export const requestToJoin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { eventId } = req.params
    const { user_id } = req.user
    res.json(await EventService.requestToJoin(eventId, user_id))
  } catch (error) {
    next(new NotFoundError('Event not found', error))
  }
}

export const findRequestedEvents = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw Error
    }

    const { user_id } = req.user
    return res.json(await EventService.findRequestedEvents(user_id))
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
    return res.json(await EventService.findParticipatingEvents(user_id))
  } catch (error) {
    next(new NotFoundError('No results found', error))
  }
}

export const findEventParticipants = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw Error
    }
    const { eventId } = req.params
    res.json(await EventService.findEventParticipants(eventId))
  } catch (error) {
    next(new NotFoundError('No participants found', error))
  }
}
