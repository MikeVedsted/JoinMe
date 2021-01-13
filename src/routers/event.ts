import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  createEvent,
  findAllEvents,
  findEventById,
  requestToJoin,
  findEventRequests,
  findEventParticipants,
  findEventsByCreator,
  findEventByCategory,
  updateEvent,
  deleteEvent,
  removeParticipant
} from '../controllers/event'

const router = express.Router()

router.post('/', isAuthenticated, createEvent)
router.get('/', findAllEvents)
router.get('/:eventId', findEventById)
router.post('/:eventId/join', isAuthenticated, requestToJoin)
router.get('/:eventId/requests', findEventRequests)
router.get('/:eventId/participants', findEventParticipants)
router.get('/creator/:userId', isAuthenticated, findEventsByCreator)
router.get('/category/:categoryId', findEventByCategory)
router.put('/:eventId', isAuthenticated, isOwner, updateEvent)
router.delete('/:eventId', isAuthenticated, isOwner, deleteEvent)
router.delete('/:eventId/remove/:participantId', removeParticipant)

export default router
