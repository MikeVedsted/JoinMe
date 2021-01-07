import express from 'express'

import { isAuthenticated, isOwner } from '../middlewares/authentication'
import {
  createEvent,
  findEventById,
  findEventsByCreator,
  findAllEvents,
  findEventByCategory,
  updateEvent,
  deleteEvent
} from '../controllers/event'

const router = express.Router()

router.post('/', isAuthenticated, createEvent)
router.get('/', findAllEvents)
router.get('/:eventId', findEventById)
router.get('/creator/:userId', findEventsByCreator)
router.get('/category/:categoryId', findEventByCategory)
router.put('/:eventId', isAuthenticated, isOwner, updateEvent)
router.delete('/:eventId', isAuthenticated, isOwner, deleteEvent)

export default router
