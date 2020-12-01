import { Request, Response, NextFunction } from 'express'

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
    console.log(error)
  }
}

export const findEventById = async (
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
    console.log(error)
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
