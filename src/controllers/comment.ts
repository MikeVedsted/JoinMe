import { Request, Response, NextFunction } from 'express'

import { NotFoundError } from '../helpers/apiError'
import CommentService from '../services/comment'

export const findCommentsByEventId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params
    res.json(await CommentService.findCommentsByEventId(eventId))
  } catch (error) {
    next(new NotFoundError('No comments found', error))
  }
}
