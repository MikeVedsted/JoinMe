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
  console.log(eventId)
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
    const {
      title,
      category,
      date,
      time,
      description,
      max_participants,
      address,
      expires_at,
      image
    } = req.body
    const event: Event = {
      title,
      category,
      date,
      time,
      description,
      max_participants,
      address,
      expires_at,
      image
    }

    res.json(await EventService.createEvent(event))
  } catch (error) {
    next(new BadRequestError('failed to create event', error))
  }
}

export const updateEvent = async (
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

export const deleteEvent = async (
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
