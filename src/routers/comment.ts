import express from 'express'

import { isAuthenticated } from '../middlewares/authentication'
import { findCommentsByEventId } from '../controllers/comment'

const router = express.Router()

router.get('/:eventId', isAuthenticated, findCommentsByEventId)

export default router
