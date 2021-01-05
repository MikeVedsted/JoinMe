import { Request, Response, NextFunction } from 'express'

import { NotFoundError, BadRequestError } from '../helpers/apiError'
import CommentService from '../services/comment'

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comment = {
      comment: req.body.comment,
      userk: req.body.userId,
      event: req.params.eventId
    }

    res.json(await CommentService.createComment(comment))
  } catch (error) {
    next(new BadRequestError('Failed to create comment', error))
  }
}

export const findCommentsByEventId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params
    res.json(await CommentService.findCommentsByEventId(eventId))
  } catch (error) {
    next(new NotFoundError('No comments found', error))
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params
    const update = req.body
    return res.json(await CommentService.updateComment(commentId, update))
  } catch (error) {
    next(new NotFoundError('Comment not found', error))
  }
}
