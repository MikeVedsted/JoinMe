import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  createEvent,
  findEventById,
  findAllEvents,
  updateEvent,
  deleteEvent
} from '../controllers/event'

const router = express.Router()

router.post('/', createEvent)
router.get('/', findAllEvents)
router.get('/:eventId', findEventById)
router.put('/:eventId', isOwner, updateEvent)
router.delete('/:eventId', deleteEvent)

export default router
