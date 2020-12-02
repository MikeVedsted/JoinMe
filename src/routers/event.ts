import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  createEvent,
  findEventById,
  findAllEvents,
  findEventByCategory,
  updateEvent,
  deleteEvent
} from '../controllers/event'

const router = express.Router()

router.post('/', isAuthenticated, createEvent)

// -----------------------------------------------
router.get('/', findAllEvents)
router.get('/:eventId', findEventById)
router.get('/category/:categoryId', findEventByCategory)
// -----------------------------------------------

router.put('/:eventId', isOwner, updateEvent)
router.delete('/:eventId', isOwner, deleteEvent)

export default router
