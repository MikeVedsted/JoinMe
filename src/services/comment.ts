import db from '../db'
import {
  createCommentQ,
  findEventCommentsQ,
  findCommentByIdQ,
  updateCommentQ,
  deleteCommentQ
} from '../db/queries'
import { Comment } from '../types'

const createComment = async (newComment: Partial<Comment>) => {
  const { comment, userk, event } = newComment
  try {
    const DBResponse = await db.query(createCommentQ, [comment, userk, event])
    const newComment: Comment = DBResponse.rows[0]
    return newComment
  } catch (error) {
    return error
  }
}

const findCommentsByEventId = async (eventId: string) => {
  try {
    const DBResponse = await db.query(findEventCommentsQ, [eventId])
    const comments: Comment[] = DBResponse.rows
    return comments
  } catch (error) {
    return error
  }
}

const updateComment = async (commentId: string, update: Partial<Comment>) => {
  try {
    const DBResponse = await db.query(findCommentByIdQ, [commentId])
    const existingComment: Comment = DBResponse.rows[0]

    if (!existingComment) {
      throw { error: 'Comment not found' }
    }

    const { comment = existingComment.comment } = update
    const updatedComments = await db.query(updateCommentQ, [commentId, comment])
    const updatedComment: Comment = updatedComments.rows[0]
    return updatedComment
  } catch (error) {
    return error
  }
}

const deleteComment = async (commentId: string) => {
  try {
    const DBResponse = await db.query(findCommentByIdQ, [commentId])
    const commentToDelete = DBResponse.rows[0]

    if (!commentToDelete) {
      throw { error: 'Comment not found' }
    }

    await db.query(deleteCommentQ, [commentId])
    return { message: 'Comment successfully deleted' }
  } catch (error) {
    return error
  }
}

export default {
  createComment,
  findCommentsByEventId,
  updateComment,
  deleteComment
}
