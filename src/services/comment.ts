import { Comment } from '../types'
import db from '../db'

const createComment = async (newComment: Partial<Comment>) => {
  const { comment, userk, event } = newComment
  try {
    const query = 'INSERT INTO comment (comment, userk, event) VALUES ($1, $2, $3) RETURNING *'
    const DBResponse = await db.query(query, [comment, userk, event])
    const newComment: Comment = DBResponse.rows[0]
    return newComment
  } catch (error) {
    return error
  }
}

const findCommentsByEventId = async (eventId: string) => {
  try {
    const query = `
      SELECT * FROM comment
      LEFT JOIN userk ON comment.userk = userk.user_id
      WHERE event = $1
      ORDER BY commented_at
    `
    const DBResponse = await db.query(query, [eventId])
    const comments: Comment[] = DBResponse.rows

    return comments
  } catch (error) {
    return error
  }
}

const updateComment = async (commentId: string, update: Partial<Comment>) => {
  try {
    const query = 'SELECT * FROM comment WHERE comment_id = $1'
    const DBResponse = await db.query(query, [commentId])
    const existingComment: Comment = DBResponse.rows[0]

    if (!existingComment) {
      throw { error: 'Comment not found' }
    }

    const { comment = existingComment.comment } = update
    const updateQuery = 'UPDATE comment SET comment = $2 WHERE comment_id = $1 RETURNING *'
    const updatedComments = await db.query(updateQuery, [commentId, comment])
    const updatedComment: Comment = updatedComments.rows[0]

    return updatedComment
  } catch (error) {
    return error
  }
}

const deleteComment = async (commentId: string) => {
  try {
    const DBResponse = await db.query('SELECT * FROM comment WHERE comment_id = $1', [commentId])
    const commentToDelete = DBResponse.rows[0]

    if (!commentToDelete) {
      throw { error: 'Comment not found' }
    } else {
      await db.query('DELETE FROM comment WHERE comment_id = $1', [commentId])
      return { message: 'Comment successfully deleted' }
    }
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
