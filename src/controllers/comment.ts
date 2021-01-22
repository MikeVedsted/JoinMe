import { Request, Response, NextFunction } from 'express'

import { NotFoundError, BadRequestError } from '../helpers/apiError'
import CommentService from '../services/comment'
import { AuthRequest } from '../types'

export const createComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw Error('Not authorized to do this')
  }
  try {
    const comment = {
      comment: req.body.comment,
      userk: req.user.user_id,
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

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params
    res.json(await CommentService.deleteComment(commentId))
  } catch (error) {
    next(new NotFoundError('Comment not found', error))
  }
}
