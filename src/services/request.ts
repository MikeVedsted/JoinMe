import db from '../db'
import {
  createParticipantQ,
  deleteRequestQ,
  requesterByRequestIdQ,
  participantByParticipantIdQ,
  deleteParticipantQ,
  findEventOwnerQ,
  findJoinRequestsByEventQ,
  findParticipantsByEventQ,
  findEventOwnerByRequestQ,
  findEventOwnerByParticipantQ
} from '../db/queries'
import { User } from '../types'

const cancelRequest = async (requestId: string, userId: string) => {
  try {
    const checkRequestor = await db.query(requesterByRequestIdQ, [requestId])

    if (checkRequestor.rows[0].requester !== userId) {
      throw Error('Not authorized to do that')
    }

    await db.query(deleteRequestQ, [requestId])
    return { message: 'Request cancelled successfully' }
  } catch (error) {
    return error
  }
}

const cancelParticipation = async (participantId: string, userId: string) => {
  try {
    const checkParticipant = await db.query(participantByParticipantIdQ, [participantId])
    const { participant } = checkParticipant.rows[0]

    if (participant !== userId) {
      throw Error('Not authorized to do that')
    }

    await db.query(deleteParticipantQ, [participantId])
    return { message: 'Participation cancelled successfully' }
  } catch (error) {
    return error
  }
}

const findEventRequests = async (eventId: string, userId: string) => {
  try {
    const findOwner = await db.query(findEventOwnerQ, [eventId])
    const { created_by } = findOwner.rows[0]
    if (created_by !== userId) {
      throw Error('Not authorized for this')
    }

    const eventRequests = await db.query(findJoinRequestsByEventQ, [eventId])
    const users: Partial<User>[] = eventRequests.rows
    return users
  } catch (error) {
    return error
  }
}

const acceptRequest = async (requestId: string, userId: string) => {
  try {
    const findOwner = await db.query(findEventOwnerByRequestQ, [requestId])
    const { created_by } = findOwner.rows[0]

    if (created_by !== userId) {
      throw new Error('Not authorized for this')
    }

    const createParticipant = await db.query(createParticipantQ, [requestId])
    await db.query(deleteRequestQ, [requestId])
    const participant = createParticipant.rows[0]
    return { message: 'Successfully accepted', participant }
  } catch (error) {
    return error
  }
}

const rejectRequest = async (requestId: string, userId: string) => {
  try {
    const findOwner = await db.query(findEventOwnerByRequestQ, [requestId])
    const { created_by } = findOwner.rows[0]

    if (created_by !== userId) {
      throw new Error('Not authorized for this')
    }

    await db.query(deleteRequestQ, [requestId])
    return { message: 'Successfully rejected' }
  } catch (error) {
    return error
  }
}

const removeParticipant = async (participantId: string, userId: string) => {
  try {
    const findOwner = await db.query(findEventOwnerByParticipantQ, [participantId])
    const { created_by } = findOwner.rows[0]

    if (created_by !== userId) {
      throw Error('Not authorized to do that')
    }

    await db.query(deleteParticipantQ, [participantId])
    return { message: 'Participation cancelled successfully' }
  } catch (error) {
    return error
  }
}

export default {
  acceptRequest,
  rejectRequest,
  cancelRequest,
  cancelParticipation,
  findEventRequests,
  removeParticipant
}
