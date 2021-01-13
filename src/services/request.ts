import db from '../db'
import { createParticipantQ, deleteRequestQ } from '../db/queries'

const acceptRequest = async (requestId: string) => {
  try {
    const createParticipant = await db.query(createParticipantQ, [requestId])
    await db.query(deleteRequestQ, [requestId])
    const participant = createParticipant.rows[0]
    return { message: 'Successfully accepted', participant }
  } catch (error) {
    return error
  }
}

const rejectRequest = async (requestId: string) => {
  try {
    await db.query(deleteRequestQ, [requestId])
    return { message: 'Successfully rejected' }
  } catch (error) {
    return error
  }
}

export default {
  acceptRequest,
  rejectRequest
}
