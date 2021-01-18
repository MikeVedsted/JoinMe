import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import {
  acceptRequest,
  rejectRequest,
  cancelRequest,
  removeParticipant,
  cancelParticipation,
  findEventRequests
} from '../controllers/request'

const router = express.Router()

router.post('/:requestId/accept', isAuthenticated, acceptRequest)
router.delete('/:requestId/reject', isAuthenticated, rejectRequest)
router.delete('/:requestId/cancel', isAuthenticated, cancelRequest)
router.delete('/:participantId/remove-participant', isAuthenticated, removeParticipant)
router.delete('/:participantId/leave', isAuthenticated, cancelParticipation)
router.get('/:eventId', isAuthenticated, findEventRequests)

export default router
