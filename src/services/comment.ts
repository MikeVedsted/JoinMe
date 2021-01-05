import { Comment } from '../types'
import db from '../db'

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
  findCommentsByEventId
}
