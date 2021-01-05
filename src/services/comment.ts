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

export default {
  createComment,
  findCommentsByEventId
}
